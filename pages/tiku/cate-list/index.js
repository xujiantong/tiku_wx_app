import { TikuModel } from "../../../models/tikuModel";
const tikuModel = new TikuModel();
// pages/tiku/cate-list/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tikuCateList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTikuCateList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    back() {
        wx.navigateBack({
            delta: 1
        })
    },
    getTikuCateList() {
        let that = this;
        tikuModel.getTikuCate((res)=>{
            res.data.forEach(item=>{
                item.icon = '/images/icon/book.png'
            })
            that.setData({
                tikuCateList: res.data
            })
        });
      
    },
    selectedTikuCate(e){
        app.globalData.cate = e.currentTarget.dataset.cate;
        wx.setStorage({
          data: JSON.stringify(e.currentTarget.dataset.cate),
          key: 'cate',
        })
        wx.navigateBack({
            delta: 1
        })
    }
})