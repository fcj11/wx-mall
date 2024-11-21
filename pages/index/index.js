Page({
  data: {
    banners: [
      { id: 1, image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 2, image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 3, image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
    ],
    navs: [
      { id: 1, name: '新品首发', icon: '🆕', type: 'new' },
      { id: 2, name: '特惠专区', icon: '🈹', type: 'sale' },
      { id: 3, name: '热卖商品', icon: '🔥', type: 'hot' },
      { id: 4, name: '推荐好物', icon: '👍', type: 'recommend' }
    ],
    goodsList: [],
    loading: false,    
    finished: false,   
    page: 1,          
    pageSize: 10,
    refreshing: false,  // 添加刷新状态
    categories: [
      { id: 1, name: '手机数码', icon: '📱' },
      { id: 2, name: '服装服饰', icon: '👔' },
      { id: 3, name: '食品生鲜', icon: '🍎' },
      { id: 4, name: '美妆护肤', icon: '💄' },
      { id: 5, name: '家居家装', icon: '🏠' },
      { id: 6, name: '母婴玩具', icon: '🧸' },
      { id: 8, name: '运动户外', icon: '⚽' },
      { id: 9, name: '图书音像', icon: '📚' }
    ],
    activeCategory: 0,  // 当前选中的分类
    cartCount: 0,      // 购物车数量
  },

  onLoad() {
    this.loadGoods()
    this.getCartCount()
  },

  // 获取购物车数量
  async getCartCount() {
    // 模拟接口请求
    await new Promise(resolve => setTimeout(resolve, 500))
    this.setData({
      cartCount: Math.floor(Math.random() * 10)
    })
  },

  // 分类点击
  handleCategoryClick(e) {
    const { id } = e.currentTarget.dataset
    this.setData({
      activeCategory: id,
      goodsList: [],
      page: 1,
      finished: false
    })
    this.loadGoods()
  },

  // 购买点击
  async handleBuyClick(e) {
    const { id } = e.currentTarget.dataset
    wx.showLoading({ title: '加入购物车...' })
    
    try {
      // 模拟添加购物车
      await new Promise(resolve => setTimeout(resolve, 800))
      
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

  // 跳转到商品详情
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  },

  // 跳转到购物车
  handleCartClick() {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '优品商城 - 品质生活选择',
      path: '/pages/index/index'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '优品商城 - 品质生活选择'
    }
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({
      refreshing: true,
      page: 1,
      finished: false,
      goodsList: []
    })
    await this.loadGoods()
    wx.stopPullDownRefresh()
    this.setData({ refreshing: false })
  },

  // 加载商品数据
  async loadGoods() {
    if (this.data.loading || this.data.finished) return
    
    this.setData({ loading: true })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      const newGoods = Array(this.data.pageSize).fill(0).map((_, index) => ({
        id: this.data.goodsList.length + index + 1,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: `新款时尚商品${this.data.goodsList.length + index + 1}`,
        desc: '这是一个商品描述',
        price: (Math.random() * 1000 + 99).toFixed(2),
        originalPrice: (Math.random() * 1000 + 199).toFixed(2),
        sales: Math.floor(Math.random() * 1000)
      }))
      
      this.setData({
        goodsList: [...this.data.goodsList, ...newGoods],
        page: this.data.page + 1,
        loading: false,
        finished: this.data.page >= 3
      })
    } catch (error) {
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    }
  },

  // 页面滚动到底部时触发
  onReachBottom() {
    this.loadGoods()
  },

  // 导航点击事件
  handleNavClick(e) {
    const { id } = e.currentTarget.dataset
    const nav = this.data.navs.find(item => item.id === id)
    
    if (nav) {
      // 根据不同类型跳转到对应页面
      switch (nav.type) {
        case 'new':
          wx.navigateTo({
            url: '/pages/goods/list/index?type=new&title=新品首发'
          })
          break
        case 'sale':
          wx.navigateTo({
            url: '/pages/goods/list/index?type=sale&title=特惠专区'
          })
          break
        case 'hot':
          wx.navigateTo({
            url: '/pages/goods/list/index?type=hot&title=热卖商品'
          })
          break
        case 'recommend':
          wx.navigateTo({
            url: '/pages/goods/list/index?type=recommend&title=推荐好物'
          })
          break
        default:
          wx.showToast({
            title: '功能开发中...',
            icon: 'none'
          })
      }
    }
  },

  // 添加搜索框点击处理函数
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },

  // 图片加载完成事件
  handleImageLoad(e) {
    const { index } = e.currentTarget.dataset
    const query = wx.createSelectorQuery()
    query.select(`#goods-image-${index}`).boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        const goodsList = this.data.goodsList
        goodsList[index].imageHeight = res[0].height
        this.setData({ goodsList })
      }
    })
  },

  // 查看更多新品
  handleMoreNew() {
    wx.navigateTo({
      url: '/pages/goods/list/index?type=new'
    })
  }
}) 