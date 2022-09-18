// pages/add-device/add-device.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    name:"",
    mac:"",
    address:"",
    port:"9",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const id = options.id;
    const list = wx.getStorageSync("list");
    if(!id){
      return;
    }
    if(list&&Array.isArray(list)){
      const device = list.find(item=>item.id === id);
      if(device){
        this.setData({...device})
      }
    }
  },
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  },
  handleChangeName(e){
    const name = e.detail.value;
    this.setData({
      name
    })
  },
  handleChangeMac(e){
    const mac = e.detail.value;
    this.setData({
      mac
    })
  },
  handleChangeAddr(e){
    const address = e.detail.value;
    this.setData({
      address
    })
  },
  handleChangePort(e){
    const port = e.detail.value;
    this.setData({
      port
    })
  },
  handleSave(){
    const id = this.uuid();
    const list = wx.getStorageSync("list");
    if(!this.data.id){
      const newData = {...this.data,id};
      if(list&&Array.isArray(list)){
        list.push(newData);
        console.log("l",newData);
        wx.setStorageSync('list', list)
      }else{
        wx.setStorageSync('list', [newData])
      }
    }else{
      const index = list.findIndex(item=>item.id === this.data.id);
      if(index !== -1){
        list[index] = this.data;
      }
      wx.setStorageSync('list',list)
    }
    

    wx.switchTab({
      url: '/pages/pc/pc'
    })
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