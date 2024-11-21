Page({
  data: {
    currentCategory: 0,
    loading: false,
    finished: false,
    refreshing: false,
    categories: [
      { id: 1, name: '手机数码', icon: '📱' },
      { id: 2, name: '服装服饰', icon: '👔' },
      { id: 3, name: '食品生鲜', icon: '🍎' },
      { id: 4, name: '美妆护肤', icon: '💄' },
      { id: 5, name: '家居家装', icon: '🏠' },
      { id: 6, name: '母婴玩具', icon: '🧸' },
      { id: 7, name: '运动户外', icon: '⚽' },
      { id: 8, name: '图书音像', icon: '📚' },
      { id: 9, name: '生活用品', icon: '🛁' },
      { id: 10, name: '其他分类', icon: '📦' }
    ],
    subCategories: []
  },

  onLoad() {
    this.loadSubCategories()
  },

  // 加载子分类
  async loadSubCategories() {
    if (this.data.loading) return
    
    this.setData({ loading: true })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟数据，添加价格
      const subCategories = Array(9).fill(0).map((_, index) => ({
        id: index + 1,
        name: `${this.data.categories[this.data.currentCategory].name}${index + 1}`,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        count: Math.floor(Math.random() * 1000) + 100,
        price: (Math.random() * 1000 + 99).toFixed(2),  // 添加随机价格
        imageHeight: 0
      }))
      
      this.setData({
        subCategories,
        loading: false,
        finished: true
      })
    } catch (error) {
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    }
  },

  // 点击主分类
  handleCategoryClick(e) {
    const { index } = e.currentTarget.dataset
    if (this.data.currentCategory === index) return
    
    this.setData({
      currentCategory: index,
      subCategories: [],
      finished: false
    })
    this.loadSubCategories()
  },

  // 下拉刷新
  async onPullDownRefresh() {
    this.setData({
      refreshing: true,
      subCategories: [],
      finished: false
    })
    await this.loadSubCategories()
    this.setData({ refreshing: false })
  },

  // 搜索点击
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },

  // 添加图片加载完成事件处理
  handleImageLoad(e) {
    const { index } = e.currentTarget.dataset
    const query = wx.createSelectorQuery()
    query.select(`#category-image-${index}`).boundingClientRect()
    query.exec((res) => {
      if (res[0]) {
        const subCategories = this.data.subCategories
        subCategories[index].imageHeight = res[0].height
        this.setData({ subCategories })
      }
    })
  },

  // 添加商品点击处理函数
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 