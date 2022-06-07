// pages/bjtx/bjtx.js
const app=getApp()
Page({

   
    data: {
        date:'',
        time:'',
        around:2,//1重复，2不重复默认2
      },
      //设置时间
      setTime(e){
        this.setData({
          time:e.detail.value
        })

      },
      //设置日期
      setDate(e){
        this.setData({
          date:e.detail.value
        })

      },
      switch1Change(){
        if(this.data.around==2){
        this.setData({
        around:1
      })
        }else {
          this.setData({
            around:2
          })
      }

      },
      formSubmit:function(e){
        let token = wx.getStorageSync('token')
        var remind=e.detail.value.name
        var url=e.detail.value.url
        var remindTime=this.data.date+' '+this.data.time

        var around=this.data.around
        wx.request({
          url:'http://39.99.85.141:8019/remind/saveRemind',
          method:'POST',
          data:{
            "around":around,
            "remind": remind,
            "remindTime": remindTime,
            "url": url,
          },
          header:{
            'context-type': 'application/json',
            'token': token
            },
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
                  url: '../remind/remind',
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
        // wx.navigateTo({
        //   url: '../remind/remind?timeData=' + that.data.time + '&time1Data=' + that.data.time1
        // })
      }
      

   
})