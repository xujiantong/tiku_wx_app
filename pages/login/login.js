import {
  UserModel
} from "../../models/userModel";
const userModel = new UserModel();
Page({

  data: {

  },
  getUserInfo(event) {

    console.log(event.detail.userInfo); // 用户信息
    wx.login({
      success: res => {
        console.log(res); //{errMsg, code(jscode)}
        userModel.userLogin({
          jscode: res.code,
          userInfo: {
            nickName: event.detail.userInfo.nickName,
            avatarUrl: event.detail.userInfo.avatarUrl
          }
        }, (res) => {
          console.log(res);
          wx.setStorage({
            data: res.data.token,
            key: 'token',
          })
          wx.switchTab({
            url: '/pages/home/home'
          })
        })
      }
    })
    this.setData({
      userInfo: event.detail.userInfo,
      hasUserInfo: true
    })
  },
})