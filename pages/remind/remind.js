// pages/remaid/remaid.js
Page({
  data:{
    date:'2022-12-22',
    pageNum:1,//默认页数为1
    pageSize:10,//页面一次加载10
    hasData:true,
    remindList:[],
    status:''
  },
  // bindDateChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  //编辑提醒
  editRemind(e){
console.log(e);
let index=e.currentTarget.dataset.index
let id=this.data.remindList[index].id
   wx.navigateTo({
     url: '../bjtx1/bjtx1?id='+id,
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
      
        url: 'http://39.99.85.141:8019/remind/getAllRemind?pageNum='+pageNum,
        method:"GET",
        header: {
          "content-type":"application/json",
          "token":token
        },
        success:(res)=>{
          console.log(res);

      if(res.statusCode == 200){
        // 返回的数组
        var result = res.data.data.list;
        // 如果返回的列表的长度没有我每页请求的长度达.代表之后没有新内容了
        // 没有数据就把当前list给他赋值就好了,并且让hasData为false，等下次在进入这个判断条件的时候，就不让他在累加了，否则会一直刷出最后几条数据，然后弹出提示框提示没有值了
        if(result.length < _this.data.pageSize){
          if(_this.data.hasData){
                _this.setData({
                  remindList: _this.data.remindList.concat(result),
                  hasData:false
                })           
                let status=this.data.remindList.status
                _this.setData({
                  status:status
                })
                wx.showToast({
                  title: '全部加载完成~',
                  icon: "none",
                  duration: 2000
                })
              }
        }else{
          // 如果还有值,就把请求出来的数组和list拼接在一起,并使它的page+1
          _this.setData({
            remindList: _this.data.remindList.concat(result),
            pageNum: _this.data.pageNum + 1
          })
        }
      } 
        }
      })
    },
  onLoad: function () {
this.getList()
  },
  switch1Change(){
    if(this.data.remindList.status==1){
      this.setData({
        status:2
      })
    }
 else {
  this.setData({
    status:1
  })
  }
  }

})