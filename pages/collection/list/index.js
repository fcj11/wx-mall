Page({
  data: {
    collections: []
  },

  onLoad() {
    this.loadCollections()
  },

  onShow() {
    // 检查是否需要更新收藏列表
    if (wx.getApp().globalData.collectionUpdated) {
      this.loadCollections()
      wx.getApp().globalData.collectionUpdated = false
    }
  },

  // 加载收藏列表
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
  }
}) 