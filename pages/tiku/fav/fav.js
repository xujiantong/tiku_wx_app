import {TikuFavModel} from "../../../models/tikuFavModel";
const tikuFavModel = new TikuFavModel();

Page({

    data: {
        favList: []
    },

    onLoad: function (options) {
        tikuFavModel.findUserFavList(res=>{
            console.log(res);
            this.setData({
                favList: res.data
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