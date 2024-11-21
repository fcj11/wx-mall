// pages/my/address/index.js
Page({
  data: {
    addressList: [],
    isSelect: false // 是否是选择地址模式
  },

  onLoad(options) {
    // 判断是否是选择地址模式
    if (options.select) {
      this.setData({ isSelect: true })
    }
  },

  onShow() {
    this.loadAddressList()
  },

  // 加载地址列表
  loadAddressList() {
    const addressList = wx.getStorageSync('addressList') || []
    this.setData({ addressList })
  },

  // 添加新地址
  handleAddAddress() {
    wx.navigateTo({
      url: '/pages/my/address/edit/index'
    })
  },

  // 编辑地址
  handleEditAddress(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/my/address/edit/index?id=${id}`
    })
  },

  // 删除地址
  handleDeleteAddress(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          const addressList = this.data.addressList.filter(item => item.id !== id)
          this.setData({ addressList })
          wx.setStorageSync('addressList', addressList)
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 设置默认地址
  handleSetDefault(e) {
    const { id } = e.currentTarget.dataset
    const { addressList } = this.data
    
    const updatedList = addressList.map(item => ({
      ...item,
      isDefault: item.id === id
    }))

    this.setData({ addressList: updatedList })
    wx.setStorageSync('addressList', updatedList)
    wx.showToast({
      title: '设置成功',
      icon: 'success'
    })
  },

  // 选择地址
  handleSelectAddress(e) {
    if (!this.data.isSelect) return
    
    const { address } = e.currentTarget.dataset
    const eventChannel = this.getOpenerEventChannel()
    
    // 将选中的地址传回上一页
    eventChannel.emit('selectAddress', address)
    wx.navigateBack()
  }
})