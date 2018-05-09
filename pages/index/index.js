//index.js
//获取应用实例
const app = getApp()

Page({
  
  data: {
    "swiper": app.data.homeSwiperConfig,
    "cateList": app.data.homeCateList,
    "fineFoodList": app.data.homeFineFoodList,
  },
  //事件处理函数
 
  onLoad: function () {
   
  },
  tapFindFoot:function(event){
  
    var url = "/pages/detail/detail?id=" + event.currentTarget.dataset.idValue + "&name=" + event.currentTarget.dataset.name;
   
    wx.navigateTo({
      url: url,
    })
    
  },
  switchToCate:function(){
    wx.switchTab({
      url: '/pages/cate/cate',
    })
  }
})
