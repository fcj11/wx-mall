// pages/my/service/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    faqList: [
      { id: 1, title: '如何修改收货地址？' },
      { id: 2, title: '如何申请退款？' },
      { id: 3, title: '商品发货需要多久？' },
      { id: 4, title: '如何查看物流信息？' },
      { id: 5, title: '优惠券使用规则' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  // 在线客服
  handleOnlineService() {
    wx.openCustomerServiceChat({
      extInfo: { url: 'https://work.weixin.qq.com/kf/xxx' },
      corpId: 'xxxx',
      success(res) {
        console.log('打开客服会话成功')
      },
      fail(err) {
        wx.showToast({
          title: '打开客服会话失败',
          icon: 'none'
        })
      }
    })
  },

  // 电话客服
  handlePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '4001234567'
    })
  },

  // 服务时间
  handleWorkTime() {
    wx.showModal({
      title: '服务时间',
      content: '在线客服：9:00-22:00\n电话客服：9:00-20:00',
      showCancel: false
    })
  },

  // FAQ点击
  handleFaqClick(e) {
    const { id } = e.currentTarget.dataset
    // 这里可以跳转到FAQ详情页
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    })
  }
})