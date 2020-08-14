// pages/home/home.js
import moment from 'moment'
Page({
  data: {
    swiperConfig:{
      indicatorDots: true,
      indicatorColor: "rgba(255,255,255,0.5)",
      indicatorActiveColor:"#FFFFFF"
    },
    swiperItemList:[
     
      {
        id:1,
        bgColor:"#5785ED",
        imgSrc: "/images/banner/guanzhu.png"
      },
      {
        id:2,
        bgColor:"#ffffff",
        // imgSrc: "/images/banner/home-banner-jifen.png"
        imgSrc: "/images/banner/jifen.png"
      },
      {
        id:3,
        bgColor:"#ffffff",
        imgSrc: "/images/banner/changshi.png"
      },
    ],
    topNews:"《你不知道的JavaScript(上卷)》",
    currentTime:"00:00:00",
    tikuGridData:[
      {
        id:1,
        icon:"/images/icon/grid-icon111.png",
        name:"选择题",
        path:""
      },
      {
        id:2,
        icon:"/images/icon/grid-icon222.png",
        name:"选择题",
        path:""
      },
      {
        id:3,
        icon:"/images/icon/grid-icon333.png",
        name:"选择题",
        path:""
      },
      {
        id:4,
        icon:"/images/icon/grid-icon444.png",
        name:"选择题",
        path:""
      },
      {
        id:5,
        icon:"/images/icon/grid-icon555.png",
        name:"选择题",
        path:""
      },
      {
        id:6,
        icon:"/images/icon/grid-icon666.png",
        name:"选择题",
        path:""
      }
    ]
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
    setInterval(()=>{
      this.setData({
        currentTime: moment(new Date()).format("HH:mm:ss")
      })
    }, 1000);

    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
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