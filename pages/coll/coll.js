// pages/coll/coll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var collList = wx.getStorageSync("coll");
    this.setData({
      collList:collList
    })
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
  
  },
  //点击进入详情页
  collDetail:function(event){
    var url = "/pages/detail/detail?id=" + event.currentTarget.dataset.idValue;
    wx.navigateTo({
      url: url,
    })
  },
  //点击删除收藏
  tapDelete:function(event){
    var id = event.currentTarget.dataset.idValue;
    var coll = this.data.collList;
    if(coll){
      for(var index in coll){
        if(coll[index].id == id){
          coll.splice(index,1);
          break;
        }
      }
    }
    this.setData({
      collList:coll
    })
  }
})