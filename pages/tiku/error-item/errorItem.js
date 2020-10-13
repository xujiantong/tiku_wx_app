import {TikuErrorItemModel} from "../../../models/tikuErrorItemModel";
const tikuErrorItemModel = new TikuErrorItemModel();

Page({
    data: {
        errorList:[]
    },
    onLoad: function (options) {
        tikuErrorItemModel.findUseErrorList(res=>{
            console.log(res);
            this.setData({
                errorList: res.data
            })
        })
    },
    jumpExercise(e){
        let {depotId, type} = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/tiku/exercise/exercise?depotId=${depotId}&type=${type}`,
        })
    }
});