//app.js

App({
  onLaunch: function () {
    let that = this;
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
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
            url: '/pages/login/index'
          })
        }
      }
    });
   




  //  wx.request({
  //    url: 'https://tiku.mok88.com/api/sys/user/findAll.json',
  //    method: "POST",
  //    header:{
  //       "Content-Type": "application/json"
  //    },
  //    success: function(res){
  //      console.log(res.data)
  //    }
  //  })
 
  },
  globalData: {
    userInfo: null,
    selected: 0,
  }
})