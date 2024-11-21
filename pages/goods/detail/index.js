Page({
  data: {
    goods: null,
    cartCount: 0,
    currentIndex: 0,
    showSpecs: false,
    isCollected: false,
    specs: {
      colors: ['白色', '黑色', '红色'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    colorIndex: -1,
    sizeIndex: -1,
    quantity: 1
  },

  onLoad(options) {
    const { id } = options
    this.loadGoodsDetail(id)
    this.getCartCount()
    this.checkCollectionStatus()
  },

  onShow() {
    this.addFootprint()
  },

  // 加载商品详情
  async loadGoodsDetail(id) {
    wx.showLoading({ title: '加载中...' })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      this.setData({
        goods: {
          id,
          title: '商品标题示例',
          desc: '这是一个商品描述示例',
          price: '299.00',
          originalPrice: '399.00',
          sales: 1000,
          reviewCount: 108,
          images: [
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg'
          ],
          detail: '<p>这是商品详情的富文本内容</p>',
          detailImages: [
            'https://img.yzcdn.cn/vant/cat.jpeg',
            'https://img.yzcdn.cn/vant/cat.jpeg'
          ],
          reviews: [
            {
              id: 1,
              username: '用户***123',
              avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
              content: '商品很好，质量不错！',
              date: '2024-02-20',
              images: ['https://img.yzcdn.cn/vant/cat.jpeg']
            }
          ]
        }
      })
      
      wx.hideLoading()
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    }
  },

  // 轮播图切换
  handleSwiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  // 图片点击预览
  handleImageClick() {
    const { goods } = this.data
    wx.previewImage({
      current: goods.images[this.data.currentIndex],
      urls: goods.images
    })
  },

  // 评价图片点击预览
  handleReviewImageClick(e) {
    const { urls, current } = e.currentTarget.dataset
    wx.previewImage({ current, urls })
  },

  // 显示规格选择
  showSpecsPopup() {
    this.setData({ showSpecs: true })
  },

  // 隐藏规格选择
  hideSpecsPopup() {
    this.setData({ showSpecs: false })
  },

  // 选择颜色
  handleColorSelect(e) {
    this.setData({
      colorIndex: e.currentTarget.dataset.index
    })
  },

  // 选择尺码
  handleSizeSelect(e) {
    this.setData({
      sizeIndex: e.currentTarget.dataset.index
    })
  },

  // 数量减少
  handleQuantityMinus() {
    if (this.data.quantity <= 1) return
    this.setData({
      quantity: this.data.quantity - 1
    })
  },

  // 数量增加
  handleQuantityPlus() {
    this.setData({
      quantity: this.data.quantity + 1
    })
  },

  // 数量输入
  handleQuantityInput(e) {
    let value = parseInt(e.detail.value)
    if (isNaN(value) || value < 1) value = 1
    this.setData({ quantity: value })
  },

  // 确认规格选择
  handleSpecsConfirm() {
    const { colorIndex, sizeIndex } = this.data
    if (colorIndex === -1 || sizeIndex === -1) {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      })
      return
    }
    this.hideSpecsPopup()
    // 这里可以处理加入购物车或立即购买的逻辑
  },

  // 收藏切换
  handleFavoriteClick() {
    this.setData({
      isFavorite: !this.data.isFavorite
    })
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    })
  },

  // 分享按钮点击
  handleShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 查看更多评价
  handleMoreReviews() {
    wx.navigateTo({
      url: `/pages/goods/reviews/index?id=${this.data.goods.id}`
    })
  },

  // 获取购物车数量
  async getCartCount() {
    // 模拟接口请求
    await new Promise(resolve => setTimeout(resolve, 300))
    this.setData({
      cartCount: Math.floor(Math.random() * 10)
    })
  },

  // 加入购物车
  async handleAddCart() {
    wx.showLoading({ title: '加入购物车...' })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      this.setData({
        cartCount: this.data.cartCount + 1
      })
      
      wx.hideLoading()
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    } catch (error) {
      wx.hideLoading()
      wx.showToast({
        title: '添加失败，请重试',
        icon: 'none'
      })
    }
  },

  // 立即购买
  handleBuyNow() {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    })
  },

  // 返回首页
  handleHomeClick() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 跳转购物车
  handleCartClick() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },

  // 检查收藏状态
  checkCollectionStatus() {
    if (!this.data.goods) return
    const collections = wx.getStorageSync('collections') || []
    const isCollected = collections.some(item => item.id === this.data.goods.id)
    this.setData({ isCollected })
  },

  // 处理收藏
  handleCollect() {
    if (!this.data.goods) return
    let collections = wx.getStorageSync('collections') || []
    const goodsInfo = this.data.goods
    
    if (this.data.isCollected) {
      // 取消收藏
      collections = collections.filter(item => item.id !== goodsInfo.id)
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      })
    } else {
      // 添加收藏
      const collectionItem = {
        id: goodsInfo.id,
        title: goodsInfo.title,
        image: goodsInfo.images[0],
        price: goodsInfo.price,
        createTime: new Date().getTime()
      }
      collections.unshift(collectionItem) // 新收藏的商品放在最前面
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
    
    // 更新缓存和状态
    wx.setStorageSync('collections', collections)
    this.setData({
      isCollected: !this.data.isCollected
    })
  },

  // 添加足迹记录
  addFootprint() {
    if (!this.data.goods) return
    
    const footprints = wx.getStorageSync('footprints') || []
    const goodsInfo = this.data.goods
    
    // 删除已存在的相同商品足迹
    const filteredFootprints = footprints.filter(item => item.id !== goodsInfo.id)
    
    // 添加新足迹
    const footprintItem = {
      id: goodsInfo.id,
      title: goodsInfo.title,
      image: goodsInfo.images[0],
      price: goodsInfo.price,
      viewTime: new Date().getTime()
    }
    
    // 新足迹放在最前面
    filteredFootprints.unshift(footprintItem)
    
    // 只保留最近50条足迹
    const savedFootprints = filteredFootprints.slice(0, 50)
    wx.setStorageSync('footprints', savedFootprints)
  }
}) 