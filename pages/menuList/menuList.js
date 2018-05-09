// pages/menuList/menuList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nu:10,
    pages:0,
    menuList:Array,
    isCid:false,
    cid:Number,
    name:String,
    loadingHidden:false,
    totalNum:Number,
    LoadingMore:false,
    noMore:false,
    noData:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var name = options.menu;
    var cid = options.id;
    console.log(options);
    wx.setNavigationBarTitle({
      title: name,
    })
    this.setData({
      name:name
    })
    var menuList = [];
    var url =""
    //如果存在cid则按照cid请求，否则按照name请求
    if(cid!=null){
      this.setData({
        isCid:true,
        cid:cid
      })
    }
    var url =self.getUrl();
    console.log(url);
    wx.request({
      url: url,
      success:function(res){
        console.log(res);
        var result = res.data.result;
        if(result){
          self.setData({
            loadingHidden: true,
            menuList: result.data,
            totalNum: result.totalNum
          });
          //判断是否已经触底
          if (self.data.pages * self.data.nu >= self.data.totalNum) {
            self.setData({
              noMore: true
            })
          }
        }else{
          //如果数据为空，则直接显示没数据
          self.setData({
            noData:true,
            loadingHidden: true,
          })
        }
        
      }
    })
  },
  //获取接下来该请求的链接
  getUrl:function(){
    var self = this;
    var url = ""
    if(!this.data.isCid){
      url = app.getMenuListWithName({
        name: self.data.name,
        nu: self.data.nu,
        pages: self.data.pages
      })
    }else{
      url = app.getMenuListWithCid({
        cid: self.data.cid,
        nu: self.data.nu,
        pages: self.data.pages
      })
    }
    this.setData({
      pages: self.data.pages+1
    })
    return url;
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
    //如果已经触底了，则直接返回
    if (this.data.noMore || this.data.noData){
      return
    }
    //如果没有触底，显示加载更多
    this.setData({
      LoadingMore:true
    })
    console.log(this.data.pages);
    var self = this;
    wx.request({
      url: self.getUrl(),
      success:function(res){
        var result = res.data.result;
        self.setData({
          LoadingMore: false,
          menuList: self.data.menuList.concat(result.data),
        });
        //判断是否已经触底
        if (self.data.pages * self.data.nu >= self.data.totalNum) {
          self.setData({
            noMore: true
          })
        }
      }
    })

    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  tapToDetail:function(event){
    var url = "/pages/detail/detail?id=" + event.currentTarget.dataset.idValue;
    wx.navigateTo({
      url: url,
    })

  }
})