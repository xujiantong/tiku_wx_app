import {
    HTTP
} from "../utils/http";
class TikuFavModel extends HTTP {


    // 题目收藏
    favTikuItem(tikuUserParams,sCallback){
        this.request({
            url: `/tiku/user/item/favTikuItem.json`,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            data: tikuUserParams,
            success: (res) => {
                sCallback(res);
            }
        })
    };
    // 取消题目收藏
    cancelFavTikuItem(tikuUserParams,sCallback){
        this.request({
            url: `/tiku/user/item/cancelFavTikuItem.json`,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            data: tikuUserParams,
            success: (res) => {
                sCallback(res);
            }
        })
    };
    // 根据depotId 和 userId 获取 favItemIdList
    getFavIdListByDepotId(depotId,sCallback){
        this.request({
            url: `/tiku/user/item/getFavIdListByDepotId.json?depotId=`+depotId,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: (res) => {
                sCallback(res);
            }
        })
    };
    // 获取题目收藏列表 {depotId, depotName, count}
    findUserFavList(sCallback){
        this.request({
            url: `/tiku/user/item/findUserFavList.json`,
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            success: (res) => {
                sCallback(res);
            }
        })
    }
    // 根据题库ID 查找用户收藏的题目详情
    findUserFavItems(depotId, sCallback){
        this.request({
            url: `/tiku/user/item/findUserFavItems.json?depotId=`+depotId,
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
    TikuFavModel
}