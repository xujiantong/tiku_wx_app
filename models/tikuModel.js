import { HTTP } from "../utils/http";

class TikuModel extends HTTP{
  // 获取题库栏目列表
  getTikuCate(sCallback){
       this.request({
        url: `/tiku/category/findAll.json`,
        method: "POST",
        success: (res)=>{
          sCallback(res);
        }
      })
  }
  // 根据栏目 ID 获取题库列表
  getTikuDepot(cateId,sCallback){
    this.request({
      url: `/tiku/depot/findListByCategory.json?category=${cateId}`,
      method: "POST",
      header: {
          "Content-Type": "application/json"
      },
      success: (res)=>{
        sCallback(res);
      }
  })
  }


}

export {TikuModel}