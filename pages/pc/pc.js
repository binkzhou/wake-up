// pages/pc/pc.js
const mqtt= require('../../utils/mqtt.min')

let client;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: [
      {
        text: '编辑',
        className: 't-swipe-cell-demo-btn edit-btn',
      },
      {
        text: '删除',
        className: 't-swipe-cell-demo-btn delete-btn',
      },
    ],
    list: []
  },
  handleClick() {
    console.log("hello")
    wx.navigateTo({
      url: '/pages/add-device/add-device'
    })
  },
  handleDelete(e){
    const id = e.currentTarget.dataset['id']
    const newList = this.data.list.filter(item=>item.id !== id);
    this.setData({
      list:newList
    })
    wx.setStorageSync('list', newList)
  },
  handleEdit(e){
    const id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: `/pages/add-device/add-device?id=${id}`
    })
  },
  hanldeSend(e){
    const {mac,address:ip,port} = e.currentTarget.dataset['item'];
    console.log("send");
    console.log(mac);
    console.log(ip);
    console.log(port);
    const options={
      connectTimeout:4000,
      clientId:new Date().getTime(),
      port:9002
    }
    if(!client){ 
      client=mqtt.connect('wxs://www.fenghuazhengmao.top',options)
    }
    if(client){
     client.publish('wakeup', JSON.stringify({mac,ip,port:Number(port)}))
  //  client.publish('wakeup', JSON.stringify(13213))
      // console.log("port");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const list = wx.getStorageSync('list');
    // if(list&&Array.isArray(list)){
    //   this.setData({...this.data,list})
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const list = wx.getStorageSync('list');
    if(list&&Array.isArray(list)){
      this.setData({...this.data,list})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})