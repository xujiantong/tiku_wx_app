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
      let _that = this;
      wx.getStorage({
        key: 'cate',
        success(res){
          let cate = JSON.parse(res.data);
          console.log(cate);
          _that.setData({
            hasCate: true,
            cate
          }),
          _that.triggerEvent('onGetTikuCate', {
            params: {
              cate,
              hasCate: true
            }
          }, {})
        },
        fail(res){
          _that.setData({
            hasCate: false
          }),
          _that.triggerEvent('onGetTikuCate', {
            params: {
              hasCate: false
            }
          }, {})
        }
      })
   
      

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
   
    goTikuCateList() {
      wx.navigateTo({
        url: '/pages/tiku/cate-list/index'
      })
    }
  }
})