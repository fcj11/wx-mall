// pages/my/footprints/index.js
Page({
  data: {
    footprintList: [],
    loading: false
  },

  onLoad() {
    this.loadFootprints()
  },

  // 加载足迹列表
  loadFootprints() {
    const footprintList = wx.getStorageSync('footprintList') || []
    this.setData({ footprintList })
  },

  // 清除足迹
  handleClear() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有足迹吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ footprintList: [] })
          wx.setStorageSync('footprintList', [])
          wx.showToast({
            title: '已清除',
            icon: 'success'
          })
        }
      }
    })
  }
})