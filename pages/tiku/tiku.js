import {HTTP} from '../../utils/http.js'
let http = new HTTP();
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
          http.request({
            url: `tiku/depot/findListByCategory.json?category=1`,
            method: "POST",
          })
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
      let that = this;
     
      wx.request({
          url: `https://tiku.mok88.com/api/tiku/depot/findListByCategory.json?category=${cate.id}`,
          method: "POST",
          header: {
              "Content-Type": "application/json"
          },
          success: function (res) {
              console.log(res.data.data)
              that.setData({
                tikuDepotList: res.data.data
              })
          }
      })
    } else {
      this.setData({
        hasCate: e.detail.params.hasCate
      })
    }
   
  }
})