Page({
  data: {
    footprints: [],
    groupedFootprints: []
  },

  onLoad() {
    this.loadFootprints()
  },

  // 加载足迹数据
  loadFootprints() {
    const footprints = wx.getStorageSync('footprints') || []
    this.setData({ footprints })
    this.groupFootprints(footprints)
  },

  // 按日期分组
  groupFootprints(footprints) {
    const groups = {}
    footprints.forEach(item => {
      const date = new Date(item.viewTime).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = {
          date,
          list: []
        }
      }
      groups[date].list.push(item)
    })

    const groupedFootprints = Object.values(groups)
    this.setData({ groupedFootprints })
  },

  // 删除单个足迹
  handleDelete(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除这条足迹吗？',
      success: (res) => {
        if (res.confirm) {
          let footprints = wx.getStorageSync('footprints') || []
          footprints = footprints.filter(item => item.id !== id)
          wx.setStorageSync('footprints', footprints)
          this.setData({ footprints })
          this.groupFootprints(footprints)
          
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  // 清空所有足迹
  handleClearAll() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有足迹吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('footprints', [])
          this.setData({
            footprints: [],
            groupedFootprints: []
          })
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 跳转商品详情
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 