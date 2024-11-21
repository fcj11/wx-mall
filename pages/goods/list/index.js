Page({
  data: {
    type: '',
    title: '',
    goodsList: [],
    loading: false,
    finished: false,
    page: 1,
    pageSize: 10,
    typeInfo: {
      new: {
        tag: '新品',
        tagColor: '#ff2d4a',
        tagBg: '#fff2f4',
        icon: '🆕'
      },
      sale: {
        tag: '特惠',
        tagColor: '#ff6b6b',
        tagBg: '#fff0f0',
        icon: '🈹',
        showDiscount: true
      },
      hot: {
        tag: '热卖',
        tagColor: '#ff9500',
        tagBg: '#fff7e6',
        icon: '🔥',
        showSales: true
      },
      recommend: {
        tag: '推荐',
        tagColor: '#07c160',
        tagBg: '#f0fff5',
        icon: '👍'
      }
    }
  },

  onLoad(options) {
    const { type = 'new', title = '商品列表' } = options
    wx.setNavigationBarTitle({ title })
    this.setData({ type, title }, () => {
      this.loadGoods()
    })
  },

  async loadGoods() {
    if (this.data.loading || this.data.finished) return
    
    this.setData({ loading: true })
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 根据不同类型生成不同的模拟数据
      const newGoods = Array(this.data.pageSize).fill(0).map((_, index) => {
        const baseGoods = {
          id: this.data.goodsList.length + index + 1,
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          title: `${this.data.title}商品${this.data.goodsList.length + index + 1}`,
          price: (Math.random() * 1000 + 99).toFixed(2),
          sales: Math.floor(Math.random() * 1000),
          tag: this.data.typeInfo[this.data.type].tag,
          tagColor: this.data.typeInfo[this.data.type].tagColor,
          tagBg: this.data.typeInfo[this.data.type].tagBg,
          icon: this.data.typeInfo[this.data.type].icon
        }

        // 特惠商品添加折扣信息
        if (this.data.type === 'sale') {
          baseGoods.originalPrice = (baseGoods.price * (1 + Math.random())).toFixed(2)
          baseGoods.discount = Math.floor(baseGoods.price / baseGoods.originalPrice * 100) / 10
        }

        // 热卖商品突出销量
        if (this.data.type === 'hot') {
          baseGoods.sales = Math.floor(Math.random() * 5000 + 1000)
        }

        // 新品添加上架时间
        if (this.data.type === 'new') {
          const days = Math.floor(Math.random() * 7)
          baseGoods.newTag = days === 0 ? '今日上新' : `${days}天前上新`
        }

        return baseGoods
      })
      
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

  onReachBottom() {
    this.loadGoods()
  },

  async onPullDownRefresh() {
    this.setData({
      page: 1,
      finished: false,
      goodsList: []
    })
    await this.loadGoods()
    wx.stopPullDownRefresh()
  },

  // 添加商品点击事件处理函数
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  },

  // 添加商品卡片点击动画效果
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    const item = this.selectComponent(`#goods-item-${index}`)
    if (item) {
      item.setData({
        active: true
      })
      setTimeout(() => {
        item.setData({
          active: false
        })
      }, 200)
    }
  }
}) 