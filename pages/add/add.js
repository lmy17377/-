Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 滑动比例计算
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false, //滑块是否显示
    slideRatio: '', //滑块比例
    color1:'#f35',//按钮颜色
    color2:'#f8f8f8',
    billNameId:0,//账单
    billTime:'',//账单时间
    content:'',//账单分类
    price:'',//价格
    status:1,//收入为1，支出为2
      createDate: '',//时间
      type:'',//分类
       index:'',//下标
       color:'',
    // 渲染分类数据
    dataList: [{
        id:1,
        text: '购物'
      },{
        id:2,
        text: '医疗'
      }, {
        id:3,
        text: '教育'
      },{
        id:4,
        text: '水电费'
      },{
        id:5,
        text: '餐饮'
      },{
        id:6,
        text: '话费'
      },{
        id:7,
        text: '交通'
      },{
        id:8,
        text: '运动'
      },{
        id:9,
        text: '宠物'
      },{
        id:10,
        text: '娱乐'
      }],
      billList:[]
  },
  onLoad: function () {
    // 这里是获取视口口宽度
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowWidth: systemInfo.windowWidth,
    })
    this.getRatio()
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/bill/getMyBillList',
      method: 'GET',
      header: {
      'Content-Type': 'application/json', 
      'token':token
    },
      success:(res)=>{
// let billList=res.data.data

          this.setData({
        billList:res.data.data
          }) 
      }
    })
  },
  // 收入支出按钮
  changeType1:function(){
this.setData({
  color1:'#f35',
  color2:'#f8f8f8',
  status:1
})
  }
  ,
  changeType2:function(){
    this.setData({
      color1:'#f8f8f8',
      color2:'#f35',
      status:2
    })
      },
      
      //改变分类按钮颜色并获取id
      changeColor(e){
        var that = this
        var index=e.currentTarget.dataset.index 
        var this_checked = e.currentTarget.dataset.index
        var parameterList = this.data.dataList//获取Json数组
        for (var i = 0; i < parameterList.length; i++) {
          if (parameterList[i].id == index+1) {
            parameterList[i].checked = true;//当前点击的位置为true即选中
            this.setData({ checkboxgroupList: this_checked })
          }
          else {
            parameterList[i].checked = false;//其他的位置为false
          }
        }
        that.setData({
          dataList: parameterList,
          index:index+1
        })
      },
      //添加按钮。获取其id值和改变颜色
      getBillId(e){
        var index1=e.currentTarget.dataset.index
        this.setData({
          activeIndex:index1,
          billNameId:this.data.billList[index1].id
        })

      console.log(e)
    }
      ,
  getRatio() {
    if (this.data.dataList.length < 4) {
      this.setData({
        slideShow: false
      })
    } else {
      var _totalLength = this.data.dataList.length * 173; //分类列表总长度
      var _ratio = 80 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      var _showLength = 750 / _totalLength * 80; //当前显示蓝色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  },
 //时间选择
    bindDateChange: function (e) {
     var that=this
      that.setData({
        createDate: e.detail.value
      })
    },

  //表单提交
  formSubmit:function(e){
    //  var that =this
     this.setData({
      modalHidden:false,
      price:Number(e.detail.value.money)
    });
    let price=this.data.price*100  //上传服务器时price*100
    let token = wx.getStorageSync('token')
    wx.showModal({
        title: '提示',
        content: '是否确认完成',
        success:(res)=> {
            if (res.confirm) {
              console.log(this.data.billNameId)
              wx.request({
                url:'http://39.99.85.141:8019/bill/saveBillRecord',
                method:'POST',
                data:{
                  "billNameId":this.data.billNameId,
                  "billTime": this.data.createDate,
                  "content": e.detail.value.remarks,
                  "price": price,
                  "status":this.data.status,
                  "type": this.data.index
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
  //模态框取消
  modalCancel(){
    wx.showToast({
      title: '取消提交',
      icon:'none'
    })
    this.setData({
      modalHidden:true,
    })
  },
  //模态框确定
  modalConfirm() {
    wx.showToast({
      title: '提交成功',
      icon:'success'
    })
    this.setData({
      modalHidden: true
    })
  }

  


})