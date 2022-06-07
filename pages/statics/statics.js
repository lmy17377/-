
const app = getApp()
Page({

  data:{
    color1:'#f7dbe5',
    color2:'white',
    color3:'#f7dbe5',
    color4:'white',
    // index:'',
    colorList:[

    ],

        dataList: [{
        id:1,
        color:"#464af8",
        text: '购物'
      },{
        id:2,
        color:"#ff6262",
        text: '医疗'
      }, {
        id:3,
        color:"#f7c11b",
        text: '教育'
      },{
        id:4,
        color:"#ff8015",
        text: '水电费'
      },{
        id:5,
        color:"#17d0bc",
        text: '餐饮'
      },{
        id:6,
        color:"#464af8",
        text: '话费'
      },{
        id:7,
        color:"#42a5f5",
        text: '交通'
      },{
        id:8,
        color:"#ffca28",
        text: '运动'
      },{
        id:9,
        color:"#ebf1fb",
        text: '宠物'
      },{
        id:10,
        color:"#f7dbe5",
        text: '娱乐'
      }],
    date:'2022-06',
    status:1,//收入为1，支出为2
    billCount:'', //月总支出或者总收入
    billNumCount:'',  //总账单数量
    billDetailsList:[],  // 最下方渲染列表
    billMap:{},   //类型列表
    colorList:{

    },
    messarr: [{
      color: '#464af8',
      num: '20',
      flownum: '20',
    },
    {
      color: '#ff6262',
      num: '50',
      flownum: '50',
    },
    {
      color: '#f7c11b',
      num: '60',
      flownum: '60',
    },
    {
      color: '#ff8015',
      num: '80',
      flownum: '80',
    },
    {
      color: '#17d0bc',
      num: '20',
      flownum: '20',
    }
  ]
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    this.getBillDetail()

  },
  undo:function(){
    wx.switchTab({
      url: '../statics/statics',
    })
  },
  touth(e){
    console.log(e);
  },
  //跳转至年账单
  toYearBill:function(){
    wx.navigateTo({
      url: '../statics1/statics1',
    })
  },
  //发起请求
   getBillDetail(){
    let token = wx.getStorageSync('token')
    let status=this.data.status
    let applyTime=this.data.date
    wx.request({
      url: 'http://39.99.85.141:8019/billName/getAllCountByMoon?applyTime='+applyTime+ '&status='+status,
      method: 'GET',
      header: {
      'Content-Type': 'application/json', 
      'token':token
    },
      success:(res)=>{

         this.setData({
          billCount:res.data.data.billCount,
          billNumCount:res.data.data.billNumCount,
          billDetailsList:res.data.data.billDetailsList,
          billMap:res.data.data.billMap
          })
      
         console.log(this.data.billMap.key);

        //开始
        const ctx = wx.createCanvasContext('Canvas');
        // 设置圆点 x  y   中心点
        let number = {
          x: 68,
          y: 68
        };
        // 获取数据 各类项的个数
        let term = this.data.billMap;
        let termarr = [];
        for (let t = 1; t < 11; t++) {
          // flownum
          let thisterm = Number(term[t])
        if(this.data.billMap[t]!=undefined){
            termarr.push({
            data: thisterm,
            // color:this.data.dataList[t].color
          }) 
        }
        }

        console.log(termarr)
        // 设置总数
        let sign = 0;
        for (var s = 0; s < termarr.length; s++) {
          sign += termarr[s].data
        }
        //设置半径 
        let radius = 60;
        for (var i = 0; i < termarr.length; i++) {
          var start = 0;
          // 开始绘制
          ctx.beginPath()
          if (i > 0) {
            for (var j = 0; j < i; j++) {
              start += termarr[j].data / sign * 2 * Math.PI
            }
          }
          var end = start + termarr[i].data / sign * 2 * Math.PI
          ctx.arc(number.x, number.y, radius, start, end);
          ctx.setLineWidth(1);
          ctx.lineTo(number.x, number.y);
          ctx.setStrokeStyle('#fff');
          ctx.setFillStyle(this.data.dataList[i].color);
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }
        ctx.draw()
      }
    })
   },
   onLoad(){
    this.getBillDetail()
 
   },
  getIncome:function(){
    this.setData({color3:'#f7dbe5',color4:'white',status:1})
    this.getBillDetail()
    console.log("收入切换成功");
    
  },
  getExpenditure:function(){
    this.setData({color3:'white',color4:'#f7dbe5',status:2})
    this.getBillDetail()
    console.log("支出切换成功");

  },
  /**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
    // 初始化

},
 
})
