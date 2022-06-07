// app.js
App({
  globalData: {
    time2:'',
  },
  data:{
    globalData: {
      time2:'',
    },
  isLogin:false   //判断是否登录，默认为否
  },
  //检测登录
  checkLogin(){
    var token=wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/user/checkToken',
      method: 'POST',
      header: { "Content-Type": "application/json" ,'token':token},
      success: res => {
        console.log('用户已登录');
        console.log(res);
        if (res.data.code==200) {

            wx.showToast({
            title: '用户已登录',
            duration: 1000,
            success: function () {
              console.log('上传成功');
           }
       })
        }else if(res.data.status == 500){
          wx.showToast({
            title: "服务器连接超时",
            icon:'loading',
            duration: 5000,
          })
        }
        else {
          wx.showToast({
            title: '用户未登录，请登录',
            icon:'none',
            duration: 1500,
            success: function () {
              console.log('用户未登录');
            setTimeout(function () {
            wx.reLaunch({
            url: '../index/index',
              })
            }, 1000);
           }
       })
        }

      },fail(){
        wx.showToast({
          title: '服务器连接超时',
          icon:'loading',
          duration: 5000,
        
     })
      }

      
    })

  },
  onLoad: function (options) {
    var that=this;
   this.getData(that);
  },

  getData(that){
    wx.request({
      url: 'http://localhost:8080/notebook/',
      method:"GET",
      data:{
        id:100
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){

        console.log(res.data);
        console.log(that)
        that.setData({
          result:res.data
        })
      }
    })
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onLaunch:function(){
wx.cloud.init({
  env:"cloud1-8gjzcsni9c004532"
})
  },
  globalData: {
    userInfo: null
  }
})
