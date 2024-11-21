Page({
  data: {
    favoriteList: [],
    loading: false
  },

  onLoad() {
    this.loadFavorites()
  },

  // 加载收藏列表
  loadFavorites() {
    const favoriteList = wx.getStorageSync('favoriteList') || []
    this.setData({ favoriteList })
  },

  // 取消收藏
  handleUnfavorite(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success: (res) => {
        if (res.confirm) {
          const favoriteList = this.data.favoriteList.filter(item => item.id !== id)
          this.setData({ favoriteList })
          wx.setStorageSync('favoriteList', favoriteList)
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
        }
      }
    })
  }
}) 