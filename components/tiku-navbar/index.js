// components/navbar/index.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageName:String,
    showNav:{
      type:Boolean,
      value:true
    },
    showHome: {
      type: Boolean,
      value: true
    },
    userInfo:{
      type: Object,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  lifetimes: {
    attached: function () {
     let that = this;
     wx.getSystemInfo({
        success (res) {
          console.log(res.statusBarHeight);
          that.setData({
            navH: res.statusBarHeight
          })
        }
      })
      console.log(this.data.userInfo)
     
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      let { index } = e.currentTarget.dataset;
      let data = this.data;
      // 自定义一个事件，并且传值
      this.triggerEvent('tikucate',{params: {}},{})
    },
    goTikuCateList(){
      wx.navigateTo({
        url: '/pages/tiku/cate-list/index'
      })
    }
  }
})