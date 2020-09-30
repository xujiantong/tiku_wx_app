import { HTTP } from "../utils/http";
class UserModel extends HTTP {
  userLogin(data,sCallback){
    this.request({
      url: `/user/wxUserLogin.json?jscode=${data.jscode}`,
      method: "POST",
      data:data.userInfo,
      success: (res)=>{
        sCallback(res);
      }
    })
  }
}
export {
  UserModel
}