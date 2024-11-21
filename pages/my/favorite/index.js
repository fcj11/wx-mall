Page({
  data: {
    favoriteList: [
      {
        id: 1,
        name: '2024春季新款连衣裙',
        price: 199.00,
        image: 'https://via.placeholder.com/200',
        createTime: '2024-03-20',
        originalPrice: 299.00
      },
      {
        id: 2,
        name: '轻便透气运动鞋',
        price: 299.00,
        image: 'https://via.placeholder.com/200',
        createTime: '2024-03-19',
        originalPrice: 399.00
      },
      {
        id: 3,
        name: '真皮时尚手提包',
        price: 399.00,
        image: 'https://via.placeholder.com/200',
        createTime: '2024-03-18',
        originalPrice: 499.00
      },
      {
        id: 4,
        name: '高端智能手表',
        price: 899.00,
        image: 'https://via.placeholder.com/200',
        createTime: '2024-03-17',
        originalPrice: 1299.00
      },
      {
        id: 5,
        name: '无线蓝牙耳机',
        price: 299.00,
        image: 'https://via.placeholder.com/200',
        createTime: '2024-03-16',
        originalPrice: 399.00
      }
    ]
  },

  onLoad() {
    this.getFavoriteList()
  },

  getFavoriteList() {
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

  deleteFavorite(e) {
    const { id } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏该商品吗？',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.favoriteList.filter(item => item.id !== id)
          this.setData({
            favoriteList: newList
          })
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          })
        }
      }
    })
  }
}) 