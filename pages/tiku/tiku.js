const app = getApp()
Page({
  data: {
    tikuCateList:[],
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
  },
  // 获取选择的题库cate
  tikucate(e){
    console.log(e.detail.params)
  }
})