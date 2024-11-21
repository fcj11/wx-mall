Page({
  data: {
    addresses: [],
    favoriteList: [
      {
        id: 1,
        title: '美味小笼包',
        address: '上海市黄浦区南京东路123号',
        image: '/images/food1.png',
        createTime: '2024-03-20'
      },
      {
        id: 2,
        title: '老街咖啡',
        address: '上海市静安区威海路456号',
        image: '/images/coffee.png', 
        createTime: '2024-03-19'
      },
      {
        id: 3,
        title: '城市书店',
        address: '上海市徐汇区衡山路789号',
        image: '/images/book.png',
        createTime: '2024-03-18'
      }
    ]
  },

  onLoad() {
    console.log('地址列表页面加载')
    // 清除旧数据
    wx.removeStorageSync('addresses')
    // 加载地址数据
    this.loadAddresses()
  },

  onShow() {
    console.log('地址列表页面显示')
    // 每次显示页面时重新加载数据
    this.loadAddresses()
  },

  // 加载地址数据
  loadAddresses() {
    let addresses = wx.getStorageSync('addresses') || []
    console.log('当前存储的地址数据：', addresses)
    
    // 如果没有地址数据，添加示例数据
    if (addresses.length === 0) {
      addresses = [
        {
          id: '1',
          name: '张三',
          phone: '13800138000',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detail: '科技园南路88号xx大厦A座10层1001室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          phone: '13900139000',
          province: '广东省',
          city: '广州市',
          district: '天河区',
          detail: '天河路100号xx广场B座20层2001室',
          isDefault: false
        }
      ]
      
      // 保存示例数据到本地存储
      wx.setStorageSync('addresses', addresses)
      console.log('已添加示例地址数据')
    }
    
    this.setData({ addresses })
    console.log('页面数据已更新：', this.data.addresses)
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
          let addresses = wx.getStorageSync('addresses') || []
          addresses = addresses.filter(item => item.id !== id)
          wx.setStorageSync('addresses', addresses)
          this.setData({ addresses })
          
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
    let addresses = wx.getStorageSync('addresses') || []
    
    addresses = addresses.map(item => ({
      ...item,
      isDefault: item.id === id
    }))
    
    wx.setStorageSync('addresses', addresses)
    this.setData({ addresses })
    
    wx.showToast({
      title: '设置成功',
      icon: 'success'
    })
  },

  getFavoriteList() {
    // TODO: 调用API获取实际的收藏数据
    console.log('获取收藏列表')
  },

  // 删除收藏项
  deleteFavorite(e) {
    const id = e.currentTarget.dataset.id
    const newList = this.data.favoriteList.filter(item => item.id !== id)
    this.setData({
      favoriteList: newList
    })
  }
}) 