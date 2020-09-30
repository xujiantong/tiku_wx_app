// pages/tiku/depot/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    depot:{
      type: Object
    }
  },
  lifetimes:{
    attached: function(){
      console.log(this.properties.depot)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    accessDepot(e){
      let depotId = e.currentTarget.dataset.id;
      this.triggerEvent('onDepotClick', {
        params: {
          id:depotId
        }
      }, {})
    }
  }
})
