const app = getApp();
Component({
  data: {
    selected: 1,
    color: "#999",
    selectedColor: "#5785ED",
    list: [   {
      "pagePath": "/pages/home/home",
      "iconPath": "/images/icon/tab-bar-home.png",
      "selectedIconPath": "/images/icon/tab-bar-home-active.png",
      "text": "首页"
    },
    {
      "pagePath": "/pages/tiku/tiku",
      "iconPath": "/images/icon/tab-bar-tiku.png",
      "selectedIconPath": "/images/icon/tab-bar-tiku-active.png",
      "text": "题库"
    },
    {
      "pagePath": "/pages/profile/profile",
      "iconPath": "/images/icon/tab-bar-profile.png",
      "selectedIconPath": "/images/icon/tab-bar-profile-active.png",
      "text": "我的"
    }
  ]
  },
  attached() {
    
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
  
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      
      wx.switchTab({
        url,
      })
   
    }
  }
})