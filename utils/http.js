import {
  config
} from "../config.js"
export class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    let token = "";
    wx.getStorageSync({
      key: 'token'
    })

    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      success: (res) => {
        // 服务器返回状态码
        let code = res.statusCode;
        // 用户自定义状态码
        if (res.data.code === "002") {
          params.success(res.data);
        } else if(res.data.code === "005"){
          wx.redirectTo({
            url: '/pages/login/login'
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: "请求失败",
          icon: 'none',
          duration: 2000
        })
      }
    })
    
  }
}