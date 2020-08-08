// pages/home/home.js
Page({

  data: {
    swiperConfig:{
      indicatorDots: true,
      indicatorColor: "rgba(255,255,255,0.5)",
      indicatorActiveColor:"#FFFFFF"
    },
    swiperItemList:[
      {
        bgColor:"#D0DDF3",
        imgSrc: ""
      },
      {
        bgColor:"#5785ED",
        imgSrc: ""
      },
      {
        bgColor:"#E7317A",
        imgSrc: ""
      },
    ],
    topNews:"《你不知道的JavaScript(上卷)》"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})