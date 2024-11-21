Page({
  data: {
    collections: []
  },

  onLoad() {
    // 清除旧数据并初始化
    wx.removeStorageSync('collections')
    this.initCollections()
  },

  onShow() {
    // 每次显示页面时重新加载数据
    this.loadCollections()
  },

  // 初始化收藏数据
  initCollections() {
    let collections = []
    // 添加示例数据
    collections = [
      {
        id: '1',
        title: 'CCKOK 可爱腊肠小狗正肩T恤',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: '89.00',
        createTime: new Date().getTime()
      },
      {
        id: '2',
        title: '夏季新款运动休闲套装',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: '199.00',
        createTime: new Date().getTime() - 1000 * 60 * 60
      },
      {
        id: '3',
        title: '韩版时尚百搭单肩包',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: '129.00',
        createTime: new Date().getTime() - 1000 * 60 * 60 * 2
      },
      {
        id: '4',
        title: '简约纯棉圆领短袖T恤',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: '69.00',
        createTime: new Date().getTime() - 1000 * 60 * 60 * 3
      },
      {
        id: '5',
        title: '新款时尚休闲运动鞋',
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: '299.00',
        createTime: new Date().getTime() - 1000 * 60 * 60 * 4
      }
    ]
      
    // 直接保存示例数据到本地存储
    wx.setStorageSync('collections', collections)
    this.setData({ collections })
  },

  // 加载收藏数据
  loadCollections() {
    const collections = wx.getStorageSync('collections') || []
    this.setData({ collections })
  },

  // 取消收藏
  handleCancelCollect(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏该商品吗？',
      success: (res) => {
        if (res.confirm) {
          let collections = wx.getStorageSync('collections') || []
          collections = collections.filter(item => item.id !== id)
          wx.setStorageSync('collections', collections)
          this.setData({ collections })
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
        }
      }
    })
  },

  // 清空所有收藏
  handleClearAll() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有收藏吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('collections', [])
          this.setData({ collections: [] })
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 跳转到商品详情
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 