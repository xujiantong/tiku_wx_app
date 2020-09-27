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
    pageName: String,
    showNav: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    },
    userInfo: {
      type: Object,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cate:{},
    hasCate: false,
  },
  lifetimes: {
    attached: function () {
      let that = this;
    
      wx.getSystemInfo({
        success(res) {
          console.log(res.statusBarHeight);
          that.setData({
            navH: res.statusBarHeight
          })
        }
      })
      

    }

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      console.log(app.globalData.cate)
      if(Object.keys(app.globalData.cate).length>0){
        this.setData({
          cate: app.globalData.cate,
          hasCate: true
        })
      } else {
        this.setData({
          hasCate: false
        })
      }

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      let {
        index
      } = e.currentTarget.dataset;
      let data = this.data;
      // 自定义一个事件，并且传值
      this.triggerEvent('tikucate', {
        params: {}
      }, {})
    },
    goTikuCateList() {
      wx.navigateTo({
        url: '/pages/tiku/cate-list/index'
      })
    }
  }
})