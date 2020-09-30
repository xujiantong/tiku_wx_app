import { UserModel } from "../../models/userModel";
const userModel = new UserModel();
Page({
 
  data: {

  },
  getUserInfo(event) {
    
    console.log(event.detail.userInfo); // 用户信息
    wx.login({
      success: res=>{
        console.log(res); //{errMsg, code(jscode)}
        userModel.userLogin({
          jscode: res.code,
          userInfo:{
            nickName: event.detail.userInfo.nickName,
            avatarUrl: event.detail.userInfo.avatarUrl
          }
        }, res=>{
          console.log(res);
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