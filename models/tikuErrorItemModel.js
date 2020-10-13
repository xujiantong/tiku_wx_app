import {
    HTTP
} from "../utils/http";

class TikuErrorItemModel extends HTTP {
    // 获取错题题库列表
    findUseErrorList(sCallback){
        this.request({
            url: `/tiku/user/item/findUseErrorList.json`,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: (res) => {
                sCallback(res);
            }
        })
    }
    // 根据题库ID 查找用户错题列表
    findUserErrorItems(depotId, sCallback){
        this.request({
            url: `/tiku/user/item/findUserErrorItems.json?depotId=`+depotId,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: (res) => {
                sCallback(res);
            }
        })

    }
}
export {
    TikuErrorItemModel
}