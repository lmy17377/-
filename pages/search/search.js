
const App = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    // 自定义顶部导航
    navHeight: App.globalData.navHeight,
    navTop: App.globalData.navTop,
    // 图标
    searchIcon: "../../../img/icon/icon-search.png",
    
    // searchresult: false,
    inputValue: "",        //输入框输入的值
    replaceValue: "",     //替换输入框的值
    eye: true,        //显示隐藏
    searchresult: false,
    searchResult: [{ result: "餐饮" }, { result: "交通" }, { result: "服装" }, { result: "购物" }, { result: "教育" }, { result: "服务" }, { result: "运动" }, { result: "医疗" }, { result: "生活缴费" }]//虚拟的查询结果
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
    //搜索功能按键
    searchStart:function(){

    },
  //利用搜索栏信息查询
  formSubmit:function(e){
    var that=this
    let billName1 = e.detail.value.billName
    that.setData({
      billName: billName1
    })
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'http://39.99.85.141:8019/billName/getBillLike?billName='+billName1,
      method: 'GET',
      header: {
      'Content-Type': 'application/json', 
      'token':token
    },
      success(res){
          let resResult=res.data.data
          that.setData({
            searchResult:resResult,
            searchresult:true
          })
      }
    })
    },
  //点击跳转到账单详情
  toDetail(e){
    let index=e.currentTarget.dataset.index
    let id=this.data.searchResult[index].id
    let billName=this.data.searchResult[index].billName
   wx.navigateTo({
     url: '../qbzd1/qbzd1?id='+id+'&billName='+billName,
   })
   console.log(e);
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
  /**
   * 换一批操作
   */
  changeother: function () {
    this.setData({
      falg: !this.data.falg
    })
  },
 
  /**
   * 热门搜索显示隐藏
   */
  reye: function () {
    this.setData({
      eye: !this.data.eye
    })
  },
 
  /**
   * 清除
   */
  // remove: function () {
  //   var _this = this
  //   wx: wx.showModal({
  //     content: '确认清除所有历史记录?',
  //     success: function (res) {
  //       if (res.confirm) {
  //         wx: wx.removeStorage({
  //           key: 'historyStorage',
  //           success: function (res) {
  //             _this.setData({
  //               historyStorage: []
  //             })
  //             wx.setStorageSync("historyStorage", [])
  //           },
  //         })
  //       } else {
  //         console.log("点击取消")
  //       }
  //     },
  //   })
  // },
 
  /**
   * 点击搜索提交跳转并存储历史记录
   */
  searchbegin: function (e) {
    let _this = this
    var data = e.currentTarget.dataset;
    _this.data.replaceValue = e.currentTarget.dataset.postname
    // _this.data.replaceValue = 
    wx: wx.setStorage({
      key: 'historyStorage',
      data: _this.data.historyStorage.concat(_this.data.inputValue),
      data: _this.data.historyStorage.concat(_this.data.replaceValue)
    })
    // console.log(_this.data.inputValue)
    // console.log(_this.data.historyStorage)
    wx.navigateTo({
      url: '../../commodity/commodity-search-list/index?postName=' + data['postname']
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 历史搜索
    let that = this

  },
  //点击进入详情页
  goToList: function (e) {
    
  },
  goUpdate: function() {
    this.onLoad()
    console.log("我更新啦")
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
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  }
})