// pages/noLogin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo(event) {
    console.log(event.detail.userInfo)
    wx.login({
      success: res=>{
        console.log(res)
        wx.request({
          url: `http://localhost:8777/api/wx/user/login?JSCODE=${res.code}`,
          method: "POST",
          header: {
              "Content-Type": "application/json"
          },
          success: function (res) {
              console.log(res)
           
          }
      })
        /**
         * todo: 用户注册/登录
         */
        // 跳转到首页
      }
    })
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
  },
})