// pages/my/footprints/index.js
Page({
  data: {
    footprintList: [
      {
        id: 1,
        name: '2024春季新款连衣裙',
        price: 199.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-20 15:30',
        originalPrice: 299.00,
        sales: 2356
      },
      {
        id: 2,
        name: '轻便透气运动鞋',
        price: 299.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-20 14:20',
        originalPrice: 399.00,
        sales: 1589
      },
      {
        id: 3,
        name: '真皮时尚手提包',
        price: 399.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-20 12:45',
        originalPrice: 499.00,
        sales: 968
      },
      {
        id: 4,
        name: '纯棉休闲T恤',
        price: 89.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-19 18:30',
        originalPrice: 129.00,
        sales: 3562
      },
      {
        id: 5,
        name: '高端智能手表',
        price: 899.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-19 16:15',
        originalPrice: 1299.00,
        sales: 526
      },
      {
        id: 6,
        name: '无线蓝牙耳机',
        price: 299.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-19 14:40',
        originalPrice: 399.00,
        sales: 4521
      },
      {
        id: 7,
        name: '儿童益智玩具套装',
        price: 159.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-19 11:20',
        originalPrice: 199.00,
        sales: 1245
      },
      {
        id: 8,
        name: '家用智能扫地机器人',
        price: 1599.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-19 10:05',
        originalPrice: 1999.00,
        sales: 865
      },
      {
        id: 9,
        name: '防晒霜套装',
        price: 128.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-18 20:30',
        originalPrice: 168.00,
        sales: 2654
      },
      {
        id: 10,
        name: '多功能料理机',
        price: 599.00,
        image: 'https://via.placeholder.com/200',
        viewTime: '2024-03-18 18:15',
        originalPrice: 799.00,
        sales: 1532
      }
    ]
  },

  onLoad() {
    this.getFootprintList()
  },

  getFootprintList() {
    wx.showLoading({
      title: '加载中...'
    })
    
    // 模拟加载延迟
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  // 跳转到商品详情
  goToDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  },

  // 删除足迹
  deleteFootprint(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除该浏览记录吗？',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.footprintList.filter(item => item.id !== id)
          this.setData({
            footprintList: newList
          })
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  // 清空足迹
  clearFootprints() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有浏览记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            footprintList: []
          })
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  }
})