const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  index:'',
    // 轮播图
    imgUrls: [
      ' ../../images2/index1.jpg',
      ' ../../images2/index2.jpg',
      ' ../../images2/index3.jpg',
      ' ../../images2/index4.jpg'
    ],
    indicatorDots: true, //	是否显示面板指示点
    autoplay: true, //是否自动切换
    circular: true, //是否采用衔接滑动
    vertical: false, //滑动方向是否为纵向
    interval: 3000, //自动切换时间间隔
    duration: 100, //滑动动画时长
    allBill:[],//获取的账单列表
    pageNum:1,//默认页数为1
    pageSize:10,//页面一次加载10
    hasData:true,
    status:'',
    remindList:[],//提醒列表
    timestamp1:'',//设定时间戳
     // 自定义顶部导航
     navHeight: App.globalData.navHeight,
     navTop: App.globalData.navTop,
     // 图标
     leftIcon: "../../../imgages2/icon-left.png",
     searchIcon: "../../images2/icon-search.png",

  },
  //检测登录
  checkLogin(){
    var token=wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/user/checkToken',
      method: 'POST',
      header: { "Content-Type": "application/json" ,'token':token},
      success: res => {
        // console.log('用户已登录');
        // console.log(res);
        if (res.data.code==200) {

            wx.showToast({
            title: '加载成功',
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

    //请求列表
    getList(){
      // this指向
      const _this = this;
      // 需要传递的值
       var token=wx.getStorageSync('token'),  
       pageNum=this.data.pageNum
        // ajax请求
      wx.request({
        // basicURL是在app.js中配置的域名;
        url: 'http://39.99.85.141:8019/billName/getAllBill?pageNum='+pageNum,
        method:"GET",
        header: {
          "content-type":"application/json",
          "token":token
        },
        success(res){
      if(res.statusCode == 200){
        // 返回的数组
        var result = res.data.data.list;
        // 如果返回的列表的长度没有我每页请求的长度达.代表之后没有新内容了
        // 没有数据就把当前list给他赋值就好了,并且让hasData为false，等下次在进入这个判断条件的时候，就不让他在累加了，否则会一直刷出最后几条数据，然后弹出提示框提示没有值了
        if(result.length < _this.data.pageSize){
          if(_this.data.hasData){
                _this.setData({
                  allBill: _this.data.allBill.concat(result),
                  hasData:false
                })
                wx.showToast({
                  title: '没有数据了哦',
                  icon: "none",
                  duration: 2000
                })
              }
        }else{
          // 如果还有值,就把请求出来的数组和list拼接在一起,并使它的page+1
          _this.setData({
            allBill: _this.data.allBill.concat(result),
            pageNum: _this.data.pageNum + 1
          })
  

        }
      } 
        }
      })
    },
  
  //请求提醒详情设置提醒
      //请求列表
      getRemindList(){
        // this指向
        const _this = this;
        // 需要传递的值
         var token=wx.getStorageSync('token') 
          // ajax请求
        wx.request({
          // basicURL是在app.js中配置的域名;
          url: 'http://39.99.85.141:8019/remind/getAllRemind?pageNum=1',
          method:"GET",
          header: {
            "content-type":"application/json",
            "token":token
          },
          success:(res)=>{
           
        if(res.statusCode == 200){
          this.setData({
            remindList:res.data.data.list
          })
          var timestamp1 = Date.parse(this.data.remindList[0].remindTime)/1000;
          var remind=this.data.remindList[0].remind
          // console.log(timestamp1)
              //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    if(timestamp1>timestamp){
    setTimeout(
      function(){
        wx.showModal({
          title: '购物提醒',
          content:'到时间了哦~',
          success: (res)=> {
          if (res.confirm) {
          wx.navigateTo({
            url: '../remind/remind',
          })
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
          })
      },(timestamp1-timestamp)*1000)
    }

    console.log("当前时间戳为：" + timestamp);
    console.log("设定时间戳为：" + timestamp1);


    // if(timestamp>timestamp1 ){

    // }
         
          // timestamp1 = timestamp1 / 1000;
        } 
          }
        })
      },


   // 点击返回上一级
   goBack: function() {
     let pages = getCurrentPages();      //获取小程序页面栈
     let beforePage = pages[pages.length - 2];       //获取上个页面的实例对象
     beforePage.setData({
       txt: "修改数据了"
     })
     beforePage.goUpdate();           //触发上个页面自定义的go_update()方法
     wx.navigateBack({
       delta: 1
     })
   },
   /**
    * 获取顶部固定高度
    */
   attached: function() {
     this.setData({
       navHeight: App.globalData.navHeight,
       navTop: App.globalData.navTop,
     })
   },

   //跳转到编辑页面
   toEdit(e){
     var index=e.currentTarget.dataset.index
     var allBill=this.data.allBill
    //  console.log(e)
    wx.navigateTo({
      url: '../edit/edit?billName=' +allBill[index].billName+'&sharing='+allBill[index].sharing+'&content='+allBill[index].content+'&id='+allBill[index].id

    })
  
   },
   //跳转到统计页面
   toStatics(e){
wx.switchTab({
  url: '../statics/statics',
})
   },


//跳转到邀请界面
toInvite(e){
  console.log(e);
  var index=e.currentTarget.dataset.index
  var allBill=this.data.allBill
  var token=wx.getStorageSync('token')
  wx.showModal({
    title: '请输入对方用户名',
    content: '',
    editable:true,
    success:(res) =>{
        
        if (res.confirm) {
          wx.request({
            url: 'http://39.99.85.141:8019/billName/saveSharingBill',
            method: 'POST',
            data: {
              "id": allBill[index].id,
              "username": res.content
            },
            header: { "Content-Type": "application/json" ,'token':token},
            success: res => {
              console.log(res);
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

            
          })
                                       
        }
        else{
           console.log('用户点击取消')
           
        }

    }
})
},
//点击导出
toExport(e){

},
onLoad: function  () {
//检测是否登录
this.checkLogin()  
this.getList()
this.getRemindList()




},  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 this.getList()
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 this.getList()
  },
  jumpToDetail() {
    wx.reLaunch({
      url: '../search/search',
        })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  }

})