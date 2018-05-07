//app.js
App({
  //没做服务器，在这里放一些数据
  data:{
    "appkey":"3acb8690e9d37f4831b706277f45adc3",
    "baseUrl":{
      "search":"http://apis.juhe.cn/cook/query.php",
      "cate":"http://apis.juhe.cn/cook/category",
      "cook":"http://apis.juhe.cn/cook/index",
      "query":"http://apis.juhe.cn/cook/queryid"
    },
    "hotSearchList":[
      "炒饭","啤酒鸭","酸菜鱼","鸡肉","包子","排骨","煲汤","牛肉","小炒肉","鸡蛋"
    ],
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
     
    })
  },
  globalData: {
    userInfo: null
  },
  getSearchListUrl:function(value){
    var url = this.data.baseUrl.search;
    url = url+ "?key=" + this.data.appkey;
    url = url+ "&menu="+value;
    return url;
  }

})