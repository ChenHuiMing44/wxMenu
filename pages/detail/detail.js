// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImg:"",
    title:"",
    burden:"",
    ingredients:[],
    imtro:"",
    steps:[],
    id:Number,
    canColl:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({title:title});
    var self = this;
    //检查下看看有没有收藏了
    wx.getStorage({
      key: 'coll',
      success: function(res) {
        var coll = res.data;
        for(var index in coll){
          if(coll[index].id ==options.id ){
            self.setData({
              canColl:false
            })
          }
        }
      },
    })

    wx.request({
      url: app.getDetailUrlWithId(options.id),
      success:function(res){
        var data = res.data.result.data[0];
        //把主料分割出来。
        // console.log(data);
        var ingredientsStr = data.ingredients;
        var itemArr = ingredientsStr.split(";");
        var ingredientsArr = [];
        for (var index in itemArr) {
          var ss = itemArr[index].split(",");
          ingredientsArr.push({
            material: ss[0],
            amount: ss[1],
          })
        }
        self.setData({
          topImg:data.albums[0],
          title:data.title,
          burden:data.burden,
          imtro:data.imtro,
          steps:data.steps,
          ingredients: ingredientsArr,
          id: options.id
        })
        wx.setNavigationBarTitle({
          title: self.data.title,
        });
        
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
  tipColl:function(event){
    var self = this;
    var newColl = {
      id:self.data.id,
      title:self.data.title,
      imgUrl:self.data.topImg
    };
    //获取本地收藏缓存
    wx.getStorage({
      key: 'coll',
      success: function(res) {
        var collArr = res.data;
        var bo =false;
        for(var index in collArr){
          if (collArr[index].id == newColl.id){
            bo = true;
          }
        }
        if(!bo){
          collArr.push(newColl);
          wx.setStorage({
            key: 'coll',
            data: collArr,
          })
          wx.showToast({
            title: '收藏成功',
          })
          self.setData({
            canColl:false
          })
        }

      },
      fail:function(){
        wx.setStorage({
          key: "coll",
          data: [newColl],
        })
        wx.showToast({
          title: '收藏成功',
        })
        self.setData({
          canColl: false
        })
      }
    })
  }
})