// pages/profile/profile.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
  },
  onLoad(options) {
    this.userAuthorized();
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          // 用户已授权
          wx.getUserInfo({
            success: data => {
              app.globalData.userInfo = data.userInfo;
              console.log(app.globalData.userInfo)
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
  getUserInfo(event) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})