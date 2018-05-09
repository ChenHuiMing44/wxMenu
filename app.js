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
    "homeSwiperConfig":[
      {
        "imgUrl":"/images/net/breakfirst.jpg",
        "url": "/pages/menuList/menuList" + "?menu=早餐",
      },{
        "imgUrl": "/images/net/lunch.jpg",
        "url": "/pages/menuList/menuList" + "?menu=午餐",
      },{
        "imgUrl": "/images/net/dinner.jpg",
        "url": "/pages/menuList/menuList" + "?menu=晚餐",
      }
    ],
    "homeCateList":[
      {
        "value":"家常菜",
        "url": "/pages/menuList/menuList" + "?menu=家常菜",
      },{
        "value": "早餐",
        "url": "/pages/menuList/menuList" + "?menu=早餐",
      },{
        "value": "下饭菜",
        "url": "/pages/menuList/menuList" + "?menu=下饭菜",
      }, {
        "value": "川菜",
        "url": "/pages/menuList/menuList" + "?menu=川菜",
      }, {
        "value": "汤",
        "url": "/pages/menuList/menuList" + "?menu=汤",
      }, {
        "value": "粥",
        "url": "/pages/menuList/menuList" + "?menu=粥",
      }, {
        "value": "面食",
        "url": "/pages/menuList/menuList" + "?menu=面食",
      }
    ],
    "homeFineFoodList":[
      {
        id:504,
        name:"鸡蛋火腿早餐饼",
        text:"很好吃的早餐，软软的，真好吃",
        img:"http:\/\/juheimg.oss-cn-hangzhou.aliyuncs.com\/cookbook\/t\/1\/504_329458.jpg"
      },{
        id:31889,
        name:"面",
        text:"独自在外，一个人的晚餐",
        img: "http:\/\/juheimg.oss-cn-hangzhou.aliyuncs.com\/cookbook\/t\/32\/31889_505050.jpg"
      }, {
        id: 44264,
        name: "皮蛋瘦肉粥",
        text: "还在为做饭麻烦而愁么？试试懒人做法吧",
        img: "http:\/\/juheimg.oss-cn-hangzhou.aliyuncs.com\/cookbook\/t\/45\/44264_463061.jpg"
      },{
        id:111,
        name:"黑椒牛排",
        text:"想在家里吃大餐？牛排你值得尝试",
        img:"http:\/\/juheimg.oss-cn-hangzhou.aliyuncs.com\/cookbook\/t\/1\/111_167080.jpg"
      }
    ]
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
    userInfo: null,
    refreshFlag: false,
  },
  getSearchListUrl:function(value){
    var url = this.data.baseUrl.search;
    url = url+ "?key=" + this.data.appkey;
    url = url+ "&menu="+value;
    return url;
  },
  getDetailUrlWithId:function(id){
    var url = this.data.baseUrl.query + "?key=" + this.data.appkey+"&id="+id;
    return url;
  },
  getMenuListWithName:function(res){
    var name = res.name;
    var rn = res.nu;
    var pn = res.pages*rn;
    var url = this.data.baseUrl.search + "?key=" + this.data.appkey+"&menu="
              +name+"&rn="+rn+"&pn="+pn;
    return url;
  },
  getMenuListWithCid:function(res){
    var cid = res.cid;
    var rn = res.nu;
    var pn = res.pages * rn;
    var url = this.data.baseUrl.cook + "?key=" + this.data.appkey + "&cid="
      + cid + "&rn=" + rn + "&pn=" + pn;
    return url;
  }

})