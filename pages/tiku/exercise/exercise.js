import {TikuFavModel} from "../../../models/tikuFavModel";
const tikuFavModel = new TikuFavModel();
import {TikuErrorItemModel} from "../../../models/tikuErrorItemModel";
const tikuErrorItemModel = new TikuErrorItemModel();

Page({
    data: {
        itemList: [],
        current: 0,
        currentId: null,
        answerSheetStatus: false,
        typeName:{
            1: "单选题",
            2: "多选题",
            3: "判断题"
        }
    },
    onLoad: function (options) {
        let { depotId, type } = options;
        let pageName = {
            "fav": "题目收藏",
            "error": "错题回顾"
        };
        wx.setNavigationBarTitle({
            title: pageName[type], //页面标题
        });
        this.setData({
            type: type,
            depotId: depotId
        });
        if(type === "fav"){
            this.getFavList(depotId);
        } else if(type === "error"){
            this.getErrorList(depotId)
        }

    },
    swiperChange(e){
        let currentIndex = e.detail.current;
    },
    checkAnswer(e) {
        let checked = e.currentTarget.dataset.checked;
        if(checked){
            return;
        }
        let type = e.currentTarget.dataset.type;
        let key = e.currentTarget.dataset.key;
        let index = e.currentTarget.dataset.index;
        let depotItem = e.currentTarget.dataset.item;
        let choseChangeAnswer = "itemList[" + index + "].answer2";
        let choseChangeChecked = "itemList[" + index + "].checked";
        this.setData({
            [choseChangeAnswer]: key
        });
        if(type === 1 || type === 3){
            this.setData({
                [choseChangeChecked]:  true
            });
        }
    },
    resetAnswer2(){
        this.setData({
            current: 0
        });
      this.getErrorList(this.data.depotId);
        wx.showToast({
            title: '答题已重置',
            icon: "none"
        })
    },
    toggleAnswerSheet() {
        this.setData({
            answerSheetStatus: !this.data.answerSheetStatus
        })
    },
    jumpItem(e){
        this.setData({
            current: e.currentTarget.dataset.index,
            currentId: this.data.itemList[e.currentTarget.dataset.index].id,
            currentDepotItem: this.data.itemList[e.currentTarget.dataset.index]
        })

    },
    favItems(e){
        let that = this;
        let tikuUserParams = {
            itemId: this.data.currentDepotItem.id,
            depotId: this.data.currentDepotItem.depot
        };
        tikuFavModel.cancelFavTikuItem(tikuUserParams, (res)=>{
            wx.showToast({
                title: res.msg,
            });
            this.getFavList(tikuUserParams.depotId);

        })


    },
    getFavList(depotId){
        tikuFavModel.findUserFavItems(depotId, (res) => {
            res.data.forEach(item => {
                item.options = JSON.parse(item.options);
                if (item.type === 2) {
                    item.answer = JSON.parse(item.answer);
                    item.answer2 = item.answer2 ? JSON.parse(item.answer2) : [];
                    item.multipleAnswer = item.answer2;
                };
            });
            this.setData({
                itemList: res.data,
                currentId: res.data[0].id,
                currentDepotItem: res.data[0],
            })
        })
    },
    getErrorList(depotId){
        tikuErrorItemModel.findUserErrorItems(depotId, (res) => {
            res.data.forEach(item => {
                item.options = JSON.parse(item.options);
                if (item.type === 2) {
                    item.answer = JSON.parse(item.answer);
                    item.answer2 = item.answer2 ? JSON.parse(item.answer2) : [];
                    item.multipleAnswer = item.answer2;
                };
            });
            this.setData({
                itemList: res.data,
                currentId: res.data[0].id,
                currentDepotItem: res.data[0],
            })
        })
    },
    checkMultipleAnswer(e){
        let {checked,type,key,index,item} = e.currentTarget.dataset;
        if(checked){return;}
        let dataKey = 'itemList['+index+'].multipleAnswer';
        let choseChangeAnswer = JSON.parse(JSON.stringify(this.data.itemList[index].multipleAnswer));
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
        if(this.data.itemList[index].multipleAnswer.length < 1){
            wx.showToast({
                title: "请选择选项后提交",
                icon: "none",
            });
            return;
        }

        let dataMultipleAnswer = 'itemList['+index+'].multipleAnswer';
        let dataAnswer2 = 'itemList['+index+'].answer2';
        let dataChecked = 'itemList['+index+'].checked';
        this.setData({
            [dataAnswer2]: item['multipleAnswer'],
            [dataChecked]:  true
        });
    }
});