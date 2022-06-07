Page({
    data:{
      expenditure:0,//支出
      income:0,//收入
      billName:'',
      billRecords:[],//这是账单详情
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
      }],//类型列表
    },
     onLoad(options){
    let id=options.id
    this.setData({
      billName:options.billName
    })
    var token=wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/billName/getBillDetails?id='+id,
      method:'GET',
      header: { "Content-Type": "application/json" ,'token':token},
      success:(res)=>{
      this.setData({
        expenditure:res.data.data.expenditure,
        income:res.data.data.income,
        billRecords:res.data.data.billRecords

      })
      // console.log(this.data.billRecords);
      // console.log(this.data.dataList);
      }
    })
     },
    
  })