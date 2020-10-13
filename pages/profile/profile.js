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
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  userAuthorized() {
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
  getUserInfo(event) {
    console.log(event)
    app.globalData.userInfo = event.detail.userInfo;
    wx.login({
      success: res=>{
        console.log(res)
      }
    })
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
  },
  clearUserInfo(){
    wx.clearStorage();
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
  
});