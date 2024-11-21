Page({
  data: {
    footprints: [],
    groupedFootprints: []
  },

  onShow() {
    this.loadFootprints()
  },

  // 加载足迹数据
  loadFootprints() {
    let footprints = wx.getStorageSync('footprints') || []
    
    // 如果没有足迹数据，添加一些示例数据
    if (footprints.length === 0) {
      footprints = [
        {
          id: '1',
          title: 'CCKOK 可爱腊肠小狗正肩T恤',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '89.00',
          viewTime: new Date().getTime()
        },
        {
          id: '2',
          title: '夏季新款休闲运动套装',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '199.00',
          viewTime: new Date().getTime() - 1000 * 60 * 60 * 24 // 昨天
        },
        {
          id: '3',
          title: '韩版时尚百搭单肩包',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '129.00',
          viewTime: new Date().getTime() - 1000 * 60 * 60 * 24 // 昨天
        },
        {
          id: '4',
          title: '简约纯棉圆领短袖T恤',
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          price: '69.00',
          viewTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 2 // 前天
        }
      ]
      
      // 保存示例数据到本地存储
      wx.setStorageSync('footprints', footprints)
    }
    
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

    // 转换为数组并按日期排序
    const groupedFootprints = Object.values(groups).sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

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
          this.loadFootprints()
          
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

  // 跳转到商品详情
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 