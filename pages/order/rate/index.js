// pages/order/rate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    goodsList: [],
    scores: [], // 每个商品的评分
    contents: [], // 每个商品的评价内容
    images: [], // 每个商品的评价图片
    anonymous: false // 是否匿名评价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    this.setData({ orderId: id })
    this.loadOrderGoods(id)
  },

  // 加载订单商品
  loadOrderGoods(orderId) {
    const orderList = wx.getStorageSync('orderList') || []
    const order = orderList.find(item => item.id === orderId)
    if (order) {
      this.setData({
        goodsList: order.goodsList,
        scores: new Array(order.goodsList.length).fill(5),
        contents: new Array(order.goodsList.length).fill(''),
        images: new Array(order.goodsList.length).fill([])
      })
    }
  },

  // 评分变化
  handleScoreChange(e) {
    const { index } = e.currentTarget.dataset
    const { value } = e.detail
    const { scores } = this.data
    scores[index] = value
    this.setData({ scores })
  },

  // 评价内容变化
  handleContentInput(e) {
    const { index } = e.currentTarget.dataset
    const { value } = e.detail
    const { contents } = this.data
    contents[index] = value
    this.setData({ contents })
  },

  // 上传图片
  handleUploadImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data
    
    wx.chooseImage({
      count: 9 - (images[index] || []).length,
      success: (res) => {
        images[index] = [...(images[index] || []), ...res.tempFilePaths]
        this.setData({ images })
      }
    })
  },

  // 删除图片
  handleDeleteImage(e) {
    const { index, imageIndex } = e.currentTarget.dataset
    const { images } = this.data
    images[index].splice(imageIndex, 1)
    this.setData({ images })
  },

  // 切换匿名评价
  handleAnonymousChange(e) {
    this.setData({
      anonymous: e.detail.value
    })
  },

  // 提交评价
  async handleSubmit() {
    const { orderId, goodsList, scores, contents, images, anonymous } = this.data
    
    // 验证评价内容
    if (contents.some(content => !content.trim())) {
      wx.showToast({
        title: '请填写评价内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '提交中...'
    })

    try {
      // 构建评价数据
      const reviews = goodsList.map((goods, index) => ({
        goodsId: goods.id,
        score: scores[index],
        content: contents[index],
        images: images[index] || [],
        anonymous
      }))

      // 更新订单状态
      const orderList = wx.getStorageSync('orderList') || []
      const updatedOrderList = orderList.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'COMPLETED',
            reviews,
            reviewTime: new Date().toISOString()
          }
        }
        return order
      })

      wx.setStorageSync('orderList', updatedOrderList)

      wx.showToast({
        title: '评价成功',
        icon: 'success'
      })

      // 返回订单列表
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500)

    } catch (error) {
      console.error('评价失败', error)
      wx.showToast({
        title: '评价失败，请重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
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