Page({
  data: {
    userInfo: null,
    orderStats: {
      unpaid: 0,
      unshipped: 0,
      unreceived: 0,
      unrated: 0
    },
    menuList: [
      {
        title: '我的订单',
        icon: '📦',
        url: '/pages/order/list/index'
      },
      {
        title: '我的收藏',
        icon: '❤️',
        url: '/pages/my/favorites/index'
      },
      {
        title: '我的足迹',
        icon: '👣',
        url: '/pages/my/footprints/index'
      },
      {
        title: '优惠券',
        icon: '🎫',
        url: '/pages/my/coupons/index'
      },
      {
        title: '收货地址',
        icon: '📍',
        url: '/pages/my/address/index'
      },
      {
        title: '帮助中心',
        icon: '❓',
        url: '/pages/my/help/index'
      },
      {
        title: '意见反馈',
        icon: '💬',
        url: '/pages/my/feedback/index'
      },
      {
        title: '设置',
        icon: '⚙️',
        url: '/pages/my/settings/index'
      }
    ]
  },

  onLoad() {
    this.loadUserInfo()
    this.loadOrderStats()
  },

  onShow() {
    // 每次显示页面时重新加载订单统计
    this.loadOrderStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    } else {
      // 未登录状态，使用内置默认头像
      this.setData({
        userInfo: {
          nickName: '未登录',
          avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        }
      })
    }
  },

  // 加载订单统计
  loadOrderStats() {
    const orderList = wx.getStorageSync('orderList') || []
    const orderStats = {
      unpaid: 0,
      unshipped: 0,
      unreceived: 0,
      unrated: 0
    }

    orderList.forEach(order => {
      switch (order.status) {
        case 'UNPAID':
          orderStats.unpaid++
          break
        case 'PAID':
          orderStats.unshipped++
          break
        case 'SHIPPED':
          orderStats.unreceived++
          break
        case 'RECEIVED':
          orderStats.unrated++
          break
      }
    })

    this.setData({ orderStats })
  },

  // 登录
  handleLogin() {
    if (this.data.userInfo.nickName === '未登录') {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const userInfo = res.userInfo
          this.setData({ userInfo })
          wx.setStorageSync('userInfo', userInfo)
        },
        fail: () => {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      })
    }
  },

  // 点击订单类型
  handleOrderType(e) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/order/list/index?type=${type}`
    })
  },

  // 点击菜单项
  handleMenuItem(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  },

  // 联系客服
  handleContact(e) {
    console.log('客服会话事件', e.detail)
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '欢迎使用我的商城',
      path: '/pages/index/index'
    }
  }
}) 