Page({
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
  },
  onLoad() {
    this.setData({
      nbTitle: '新标题',
      nbLoading: false,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }
})