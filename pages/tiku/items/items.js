import {TikuModel} from "../../../models/tikuModel";
import {TikuFavModel} from "../../../models/tikuFavModel";



const tikuModel = new TikuModel();
const tikuFavModel = new TikuFavModel();
Page({
    
    data: {
        depotItemList: [],
        current: 0,
        answerSheetStatus: false,
        currentId: null,
        favList: [],
        typeName:{
            1: "单选题",
            2: "多选题",
            3: "判断题"
        }
    },

    onLoad: function (options) {
        let that = this;
        this.setData({
            depotId: options.depotId,
            depotName: options.name,
        });
        wx.setNavigationBarTitle({
            title: that.data.depotName, //页面标题
            success: () => {}, //接口调用成功的回调函数
            fail: () => {}, //接口调用失败的回调函数
            complete: () => {} //接口调用结束的回调函数（调用成功、失败都会执行）
        });
        tikuModel.getTikueItemByDepotId(options.depotId, (res) => {
            res.data.forEach(item => {
                item.options = JSON.parse(item.options);
                if (item.type === 2) {
                    item.answer = JSON.parse(item.answer);
                    item.answer2 = item.answer2 ? JSON.parse(item.answer2) : [];
                    item.multipleAnswer = item.answer2;
                };
            });
            this.setData({
                depotItemList: res.data,
                currentId: res.data[0].id,
                currentDepotItem: res.data[0],
                hasFav: this.data.favList.includes(res.data[0].id)
            })
        })
        that.getFavIdList();
    },
    itemPrev(e) {
        if (this.data.current === 0) {
            wx.showToast({
                title: '已经是第一题了',
                icon: "none"
            })
            return;
        }
        this.setData({
            current: this.data.current - 1
        })
    },
    itemNext(e) {
        if (this.data.current === this.data.depotItemList.length - 1) {
            wx.showToast({
                title: '已经是最后一题了',
                icon: "none"
            })
            return;
        }
        this.setData({
            current: this.data.current + 1
        })
    },
    checkAnswer(e) {
        let {checked,type,key,index,item} = e.currentTarget.dataset;
        if(checked){
            return;
        }
        let choseChangeAnswer = "depotItemList[" + index + "].answer2";
        let choseChangeChecked = "depotItemList[" + index + "].checked";
        this.setData({
            [choseChangeAnswer]: key,
            [choseChangeChecked]:  true
        });
        let tikuUserParams = {
            userId: null,
            itemId: item['id'],
            depotId: item['depot'],
            answer: item['answer'],
            answer2: key,
            type: (item['answer'] === key) ? 3 : 2,//题目类型 1: 收藏 2: 错题 3: 正确
            status: 0 //0: 第一次做 1: 被重置
        };
        tikuModel.saveTikuUserItem(tikuUserParams, (res) => {
            console.log(res);
        })
        if(item['answer'] === key){
            if (this.data.current === this.data.depotItemList.length - 1) {
                wx.showToast({
                    title: '已经是最后一题了',
                    icon: "none"
                })
                return;
            }
            this.setData({
                current: this.data.current + 1
            })
        }
    },
    swiperChange(e) {
        this.setData({
            current: e.detail.current,
            currentId: this.data.depotItemList[e.detail.current].id,
            currentDepotItem: this.data.depotItemList[e.detail.current],
            hasFav: this.data.favList.includes(this.data.depotItemList[e.detail.current].id)
        })
    },
    toggleAnswerSheet() {
        this.setData({
            answerSheetStatus: !this.data.answerSheetStatus
        })
    },
    jumpItem(e){
        console.log(e)
        this.setData({
            current: e.currentTarget.dataset.index,
            currentId: this.data.depotItemList[e.currentTarget.dataset.index].id,
            currentDepotItem: this.data.depotItemList[e.currentTarget.dataset.index],
            hasFav: this.data.favList.includes(this.data.depotItemList[e.currentTarget.dataset.index].id)
        })
    },
    favItems(e){
        let that = this;
        let tikuUserParams = {
            itemId: this.data.currentDepotItem.id,
            depotId: this.data.currentDepotItem.depot
        }
        if(!this.data.favList.includes(this.data.currentId)){
            tikuFavModel.favTikuItem(tikuUserParams,(res)=>{
                wx.showToast({
                    title: res.msg,
                })
                this.setData({
                    hasFav: true
                })
                that.getFavIdList();
            })
        } else {
            tikuFavModel.cancelFavTikuItem(tikuUserParams, (res)=>{
                wx.showToast({
                    title: res.msg,
                })
                this.setData({
                    hasFav: false
                })
                that.getFavIdList();
            })
        }
    },
    getFavIdList(){
        tikuFavModel.getFavIdListByDepotId(this.data.depotId, (res)=>{
            console.log(res)
            this.setData({
                favList: res.data
            })
        })
    },


    checkMultipleAnswer(e){
        let {checked,type,key,index,item} = e.currentTarget.dataset;
        if(checked){return;}
        let dataKey = 'depotItemList['+index+'].multipleAnswer';
        let choseChangeAnswer = JSON.parse(JSON.stringify(this.data.depotItemList[index].multipleAnswer));
        let keyIndex = choseChangeAnswer.indexOf(key);
        if(keyIndex !== -1){
            choseChangeAnswer.splice(keyIndex, 1)
        } else {
            choseChangeAnswer.push(key);
        }
        this.setData({
            [dataKey]: choseChangeAnswer
        });
    },
    confirmMultipleAnswer(e){
        let {index, item} = e.currentTarget.dataset;
        if(this.data.depotItemList[index].multipleAnswer.length < 1){
            wx.showToast({
                title: "请选择选项后提交",
                icon: "none",
            });
            return;
        }

        let dataMultipleAnswer = 'depotItemList['+index+'].multipleAnswer';
        let dataAnswer2 = 'depotItemList['+index+'].answer2';
        let dataChecked = 'depotItemList['+index+'].checked';
        console.log(index);
        console.log(this.data.depotItemList[index]);

        let tikuUserParams = {
            userId: null,
            itemId: item['id'],
            depotId: item['depot'],
            answer: JSON.stringify(item['answer']),
            answer2: JSON.stringify(item['multipleAnswer']),
            type: (item['answer'].sort().toString() === item['multipleAnswer'].sort().toString() ) ? 3 : 2,//题目类型 1: 收藏 2: 错题 3: 正确
            status: 0 //0: 第一次做 1: 被重置
        };
        tikuModel.saveTikuUserItem(tikuUserParams, (res) => {
            this.setData({
                [dataAnswer2]: item['multipleAnswer'],
                [dataChecked]:  true
            });
        })
    }


});