Page({
  data: {
    date:'2022-06',
    billList:[],//获取列表
  },
  bindDateChange: function (e) {
    var date = e.detail.value; 
    var token=wx.getStorageSync('token')
    this.setData({
      date:date
    })
    wx.request({
      url: 'http://39.99.85.141:8019/billName/getBillByYM?applyTime='+date,
      method:'GET',
      header: { "Content-Type": "application/json" ,'token':token},
      success:(res)=>{
      this.setData({
       billList:res.data.data.list
      })
      // console.log(this.data.billList);
      }
    })
  },
  //启动时加载
  onLoad(){
    var token=wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/billName/getBillByYM?applyTime='+this.data.date,
      method:'GET',
      header: { "Content-Type": "application/json" ,'token':token},
      success:(res)=>{
      this.setData({
       billList:res.data.data.list
      })
      console.log(this.data.billList);
      }
    })
  },
  //点击跳转到账单详情
  toDetail(e){
    let index=e.currentTarget.dataset.index
    let id=this.data.billList[index].id
    let billName=this.data.billList[index].billName
   wx.navigateTo({
     url: '../qbzd1/qbzd1?id='+id+'&billName='+billName,
   })
  //  console.log(e);
  }
})