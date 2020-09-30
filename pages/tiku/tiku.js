import { TikuModel } from "../../models/tikuModel";
const tikuModel = new TikuModel();
const app = getApp()
Page({
  data: {
    tikuDepotList:[],
    tikuCate:{},
  },
  onLoad() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          // 用户已授权
          wx.getUserInfo({
            success: data => {
              app.globalData.userInfo = data.userInfo;
              console.log(data)
              this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
            },
          })
        } else {
          // 未授权
          console.log("err")
        }
      }
    });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    // wx.getStorage({
    //   key: 'cate',
    // })
   
    // 获取当前题库下面的科目
  },
  // 获取选择的题库cate
  onGetTikuCate(e){
    if(e.detail.params.hasCate){
      let cate = e.detail.params.cate;
      this.setData({
        tikuCate: cate,
        hasCate: e.detail.params.hasCate
      });
      console.log("depot")
      tikuModel.getTikuDepot(cate.id,(res) => { 
        this.setData({
          tikuDepotList: res.data
        })
      })
    } else {
      this.setData({
        hasCate: e.detail.params.hasCate
      })
    }
   
  },
  onDepotClick(e){
    let depotId = e.detail.params.id;
    wx.showToast({
      title: '题目 ID: ' + depotId,
      icon: "none"
      
    })
  }
})