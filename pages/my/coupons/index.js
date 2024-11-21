// pages/my/coupons/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'valid',
    couponList: [],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadCoupons()
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

  // 切换标签
  handleTabChange(e) {
    const { tab } = e.currentTarget.dataset
    this.setData({ 
      activeTab: tab,
      couponList: [] 
    }, () => {
      this.loadCoupons()
    })
  },

  // 加载优惠券
  async loadCoupons() {
    this.setData({ loading: true })

    try {
      // 模拟加载数据
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 模拟优惠券数据
      const mockCoupons = [
        {
          id: 1,
          type: 'discount', // discount: 折扣券, amount: 满减券
          name: '全场9折',
          discount: 0.9,
          minAmount: 100,
          validStartTime: '2024-02-01',
          validEndTime: '2024-03-31',
          useTime: '2024-02-15', // 使用时间
          status: 'valid', // valid: 可用, used: 已使用, expired: 已过期
          description: '全场通用，不可与其他优惠叠加'
        },
        {
          id: 2,
          type: 'amount',
          name: '满100减20',
          amount: 20,
          minAmount: 100,
          validStartTime: '2024-02-01',
          validEndTime: '2024-03-31',
          status: 'valid',
          description: '全场通用，不可与其他优惠叠加'
        }
      ]

      // 根据当前标签筛选优惠券
      const filteredCoupons = mockCoupons.filter(coupon => 
        coupon.status === this.data.activeTab
      )

      this.setData({
        couponList: filteredCoupons
      })

    } catch (error) {
      console.error('加载优惠券失败', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 使用优惠券
  handleUseCoupon(e) {
    const { coupon } = e.currentTarget.dataset
    
    // 判断是否可用
    if (coupon.status !== 'valid') {
      wx.showToast({
        title: '该优惠券不可用',
        icon: 'none'
      })
      return
    }

    // 返回上一页并传递选中的优惠券
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    
    if (prevPage && prevPage.route.includes('checkout')) {
      // 如果是从结算页面进入，则返回并应用优惠券
      prevPage.setData({
        selectedCoupon: coupon
      }, () => {
        prevPage.calculateTotal() // 重新计算总价
      })
      wx.navigateBack()
    } else {
      // 否则跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})