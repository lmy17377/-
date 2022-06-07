  
Page({
  data: {
    userInfo: '',
    isLogin:false

  },
  
  onLoad(res) {
    
    // 获取缓存数据
    let user = wx.getStorageSync('user')
    this.setData({
      userInfo: user
    })
  },
   
  // 授权登录
  login(e) {
    wx.getUserProfile({
      desc: '请先授权登录',
      success: res => {
        let user = res.userInfo
        // 把用户信息存储到本地   
        wx.setStorageSync('user', user)
        this.setData({
          userInfo: user
        }) 
        wx.login({
          success(res){

            wx.request({ 
              url: 'http://39.99.85.141:8019/user/login',
              method: 'POST',
              data: {
                "code":res.code,
                "path": user.avatarUrl,
                "username":user.nickName
        
              },
              header: { "Content-Type": "application/json" },
              success: res => {
                console.log(res);
                 // 把token存储到本地
                wx.setStorageSync('token', res.data.data)
                let token = wx.getStorageSync('token')
               

                if (res.data.code==200) {
                  wx.showToast({
                  title: '成功',
                  duration: 1000,
                  success: function () {
                    console.log('上传成功');
                  setTimeout(function () {
                  wx.reLaunch({
                  url: '../shouye/shouye',
                    })
                  }, 1000);
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
                  title: res.data.msg,
                  icon:'none',
                  duration: 5000,
                
             })
              }

            },fail(){
              wx.showToast({
                title: '服务器连接超时',
                icon:'loading',
                duration: 5000,
              
           })
            }
        });
          },
          fail: err => {
            wx.showToast({
              title: '登录失败',
              duration:2000
            })
          }
        })
          }
        })


  },
  // 退出登录
  loginOut() {
    let token = wx.getStorageSync('token')
    wx.request({
      url:'http://39.99.85.141:8019/user/logout',
      method:'POST',
      header:{
        'context-type': 'application/json',
        'token': token
        },
      success:res =>{
        wx.clearStorageSync();//清除缓存
        wx.showToast({
           title: '退出登录成功',
           icon: 'none',
           duration: 2000,
           success: function () {
              setTimeout(function () {
                 //跳转到首页，强制重启
                 wx.reLaunch({
                    url: '/pages/index/index',
                 })
              }, 2000);
           }
        })

        console.log('退出登录')
      }  
      }),
this.setData({
  userInfo: '',
  token:'',
  isLogin:false
}),
    // 把user缓存存储为空
    wx.setStorageSync('user', '')
        // 把token存储为空
        wx.setStorageSync('token', '')
        // console.log(this.token)
  },
// 联系客服
conta:function(e){
  wx.cloud.callFunction({
      name: 'getMessage'  // 名字和云函数名字对应
  }).then(res => {   //这里输出看看，其实没啥用
      console.log(res)
  }).catch(err => {
      console.error(err)
  })
},

})