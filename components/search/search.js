// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },
  /**
   * 组件的初始数据
   */
  data:{
    "detailHidden":true,
    "inputFocus":false,
    "hotSearchList": getApp().data.hotSearchList,
    "hitorySratchList": wx.getStorageSync("hitorySratchList"),
    searchInput:""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickSearch:function(){
      //点击搜索按钮
      this.setData({
        detailHidden:false,
        inputFocus:true
      })
    },
    searchInput:function(event){
      this.setData({
        searchInput:event.detail.value
      })
    },
    //清空输入框
    clearInput:function(){
      this.setData({
        searchInput:"",
        inputFocus:true
      })
    },
    //点击取消，取消搜索
    cancelSearch:function(){
      this.setData({
        detailHidden:true,
        inputFocus:false
      })
    },
    //点击键盘上完成
    querySearch:function(event){
      this.navigatePage(event.detail.value);
    },
    //点击热门搜索选项
    clickHotSearch:function(event){
      this.navigatePage(event.target.dataset.value);
    },
    //清空最近搜索的历史记录
    clearHistory:function(){
      this.setData({
        hitorySratchList:[]
      })
      wx.removeStorage({
        key:'hitorySratchList',
        success: function(res) {},
      });

    },
    navigatePage:function(value){
      var url = "/pages/menuList/menuList" + "?menu=" + value;
      wx.getStorage({
        key: 'hitorySratchList',
        success: function(res) {
          var data = res.data;
          console.log(data);
          data.unshift({
            "value":value,
            "url":url,
          })
          wx.setStorage({
            key: 'hitorySratchList',
            data: data,
          })
        },
        fail:function(){
          var data = [{
            "value": value,
            "url": url,
          }];
          wx.setStorage({
            key: 'hitorySratchList',
            data: data,
          })

        }
      });
      var self = this;
      wx.navigateTo({
        url: url,
        success:function(){
          setTimeout(function(){
            self.setData({
              searchInput: "",
              "detailHidden": true,
              "inputFocus": false,
            })
            //然后因为缓存的问题给本页面的数据也存上  //到时候把这个该进成对象
            var da = self.data.hitorySratchList || [];
            da.unshift({
              "value": value,
              "url": url,
            })
            self.setData({
              hitorySratchList: da
            }) 
          },500)
          //清空界面数据，以免返回时候还是搜索界面
          
        }
      })
      
    }
  },
})
