//app.js

App({
  onLaunch: function () {
    let that = this;
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']) {
          // 用户已授权
          wx.getUserInfo({
            success: data => {
              that.globalData.userInfo = data.userInfo;
              console.log(data)
            },
          })
        } else {
          // 未授权
          console.log("err")
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    });
  
  },
  globalData: {
    userInfo: null,
    selected: 0,
  }
})