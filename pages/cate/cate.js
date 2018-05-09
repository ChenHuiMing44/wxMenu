// pages/cate/cate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:false,
    cateList:Array,
    selectArr:Array,
    selectItm:Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var url = app.data.baseUrl.cate+"?key="+app.data.appkey;
    wx.request({
      url: url,
      dataType:"json",
      success:function(res){
        var cateList = res.data.result;
        var selectItm = 0;
        var seleArr = cateList[selectItm].list;
        self.setData({
          loadingHidden:true,
          cateList:cateList,
          selectArr: seleArr,
          selectItm: selectItm
        })
        console.log(cateList);
      }
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
  tapCate:function(event){
    var self = this;
    var index = event.currentTarget.dataset.indexValue;
    if (index == this.data.selectItm){
      return;
    }
    this.setData({
      selectItm:index,
      selectArr: self.data.cateList[index].list
    })

  },
  //点击跳转分类列表页
  tapNavigate:function(event){
    var id = event.currentTarget.dataset.idValue;
    var name = event.currentTarget.dataset.name;
    // var url = app.data.baseUrl.cook
    // url = url + "?key=" + app.data.appkey + "&cid=" + id;
    var url = "/pages/menuList/menuList?id="+id+"&menu="+name;
    wx.navigateTo({
      url: url,
    })
  }
})