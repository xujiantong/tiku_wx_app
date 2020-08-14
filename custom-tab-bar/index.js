Component({
  data: {
    selected: 0,
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
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})