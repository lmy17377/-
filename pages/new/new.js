// pages/new/new.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      color1:'white',
  color2:'#a5e9f6',
  billName:'',
  content:'',
  sharing:2
},
myBill :function(e){
var that=this
let billId=Number(e.currentTarget.dataset.id)
that.setData({
  sharing:billId,
  color1:'white',color2:'#a5e9f6'
})
},
ourBill:function(e){
var that=this
let billId=Number(e.currentTarget.dataset.id)
that.setData({
  sharing:billId,
  color1:'#a5e9f6',color2:'white'
})
},
// 提交表单
formSubmit:function(e){
var that=this
let billName1 = e.detail.value.billName
let content1 = e.detail.value.content
that.setData({
  billName: billName1,
  content: content1
})
// console.log("后执行");


},

 /** 确认之后提交数据并跳转到首页页面 */
 jumpToDetail:function(e){
   var that =this
  //  console.log("先执行");
  //  console.log(that.data)
  wx.showModal({
      title: '提示',
      content: '确认完成吗',
      success:(res) =>{
          
          if (res.confirm) {
              console.log("最后执行")
              console.log(res.con);
              console.log('用户点击确定')
              let token = wx.getStorageSync('token')
              let billName = that.data.billName
              let content = that.data.content
              let sharing = that.data.sharing
              wx.request({
                url: 'http://39.99.85.141:8019/billName/saveBill',
                method: 'POST',
                data: {
                  "billName":billName,
                  "content":content,
                  "sharing":sharing
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
                      title: '服务器连接超时',
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
undo:function(){
  this.setData({color1:'white',color2:'#a5e9f6'})

},
doing:function(){
  this.setData({color1:'#a5e9f6',color2:'white'})
},

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
        
          

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

  }
})