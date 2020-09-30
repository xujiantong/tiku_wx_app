import {config} from "../config.js"
export class HTTP{
    request(params){
        if(!params.method){
            params.method="GET"
        }
        wx.request({
          url: config.api_base_url + params.url,
          method: params.method,
          data: params.data,
          header:{
              'content-type': 'application/json',
              'appkey': config.appKey
          },
          success: (res) => {
            let code = res.statusCode;
            console.log("HTTP")
            console.log(res)
          },
          fail: (err) => {

          }
        })
    }
}