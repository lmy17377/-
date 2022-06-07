// pages/bjtx/bjtx.js
const app=getApp()
Page({

   
    data: {
        date:'',
        time:'',
        around:2,//1重复，2不重复默认2
        id:'',
        remind:'',
        url:'',
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
        around:1,
        switch1Checked:false
      })
        }else {
          this.setData({
            around:2,
            switch1Checked:true
          })
      }

      },
      //提交之后调用编辑接口
      formSubmit:function(e){
        let token = wx.getStorageSync('token')
        var remind=e.detail.value.name
        var url=e.detail.value.url
        var remindTime=this.data.date+' '+this.data.time
        // app.globalData.time2=remindTime
        wx.removeStorageSync('time2')
        let time2 = wx.getStorageSync('time2')
        console.log(time2);
        var around=this.data.around
        wx.request({
          url:'http://39.99.85.141:8019/remind/updateRemind',
          method:'POST',
          data:{
              "id":this.data.id,
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

      },
      //加载
      onLoad(options){
        let token = wx.getStorageSync('token')
     console.log(options);
    //  var timestamp2=Date.parse(options.remindTime)时间戳转换
    //  console.log(timestamp2);
     this.setData({
        //  date:date,
        //  time:time,
        //  url:options.url,
        //  around:options.around,
         id:options.id
     })
     wx.request({
        url: 'http://39.99.85.141:8019/remind/getRemind?id='+this.data.id,
        method:'GET',
        header:{
            'context-type': 'application/json',
            'token': token
            },
            success:(res)=>{
                console.log(res);
            this.setData({
                remind:res.data.data.remind,
                id:res.data.data.id,
                url:res.data.data.url,
                // remindTime:res.data.data.remindTime,
                date:res.data.data.remindTime.substring(0,10),
                time:res.data.data.remindTime.substring(11,19),
                around:res.data.data.status
            })

            }
      })  
      },
//删除提醒
deleteRemind(){
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/remind/removeRemind?id='+this.data.id,
      method:'DELETE',
      header: { "Content-Type": "application/json" ,'token':token},
   success: res => {
                    console.log(res);
                    if (res.data.code==200) {
                        wx.showToast({
                        title: '删除成功',
                        duration: 1000,
                        success: function () {
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
  },
   
})