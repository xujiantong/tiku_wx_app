import {
  HTTP
} from "../utils/http";

class TikuModel extends HTTP {
  // 获取题库栏目列表
  getTikuCate(sCallback) {
    this.request({
      url: `/tiku/category/findAll.json`,
      method: "POST",
      success: (res) => {
        sCallback(res);
      }
    })
  }
  // 根据栏目 ID 获取题库列表
  getTikuDepot(cateId, sCallback) {
    this.request({
      url: `/tiku/depot/findWxDepotList.json?cateId=${cateId}`,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        sCallback(res);
      }
    })
  }
  // 根据DepotId获取题目列表
  getTikueItemByDepotId(depotId, sCallback){
    this.request({
      url: `/tiku/user/item/findListByDepotExtend.json?depot=${depotId}`,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        sCallback(res);
      }
    })
  }
  // 保存用户作答题目
  saveTikuUserItem(tikuUserParams, sCallback){
    this.request({
      url: `/tiku/user/item/saveUserItem.json`,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      data: tikuUserParams,
      success: (res) => {
        sCallback(res);
      }
    })
  }


}

export {
  TikuModel
}