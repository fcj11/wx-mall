// pages/order/list/index.js
Page({
  data: {
    type: 'all', // 当前选中的状态标签
    orderList: [], // 订单列表
    loading: false, // 是否正在加载
    finished: false, // 是否加载完成
    page: 1, // 当前页码
  },

  onLoad() {
    this.loadOrderList()
  },

  // 加载订单列表
  loadOrderList() {
    if(this.data.loading || this.data.finished) return
    
    this.setData({ loading: true })
    
    // 模拟不同状态的订单数据
    const mockOrders = [{
      id: '1',
      status: 'UNPAID',
      statusText: '等待买家付款',
      goodsList: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'CCKOK 可爱腊肠小狗正肩T恤',
        specs: '海盐蓝第二批预售;L',
        price: 80.00,
        quantity: 1
      }],
      totalPrice: 80.00,
      createTime: '2024-03-01 12:00:00'
    }, {
      id: '2',
      status: 'UNSHIPPED',
      statusText: '待发货',
      goodsList: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'CCKOK 可爱腊肠小狗正肩T恤',
        specs: '白色第一批现货;M',
        price: 80.00,
        quantity: 2
      }],
      totalPrice: 160.00,
      createTime: '2024-03-01 11:00:00'
    }, {
      id: '3',
      status: 'UNRECEIVED',
      statusText: '待收货',
      goodsList: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'CCKOK 可爱腊肠小狗正肩T恤',
        specs: '黑色第一批现货;XL',
        price: 80.00,
        quantity: 1
      }],
      totalPrice: 80.00,
      createTime: '2024-03-01 10:00:00'
    }, {
      id: '4',
      status: 'UNRATED',
      statusText: '待评价',
      goodsList: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: 'CCKOK 可爱腊肠小狗正肩T恤',
        specs: '粉色第一批现货;S',
        price: 80.00,
        quantity: 1
      }],
      totalPrice: 80.00,
      createTime: '2024-03-01 09:00:00'
    }]

    // 根据当前标签筛选订单
    let filteredOrders = mockOrders
    if (this.data.type !== 'all') {
      filteredOrders = mockOrders.filter(order => {
        switch (this.data.type) {
          case 'unpaid':
            return order.status === 'UNPAID'
          case 'unshipped':
            return order.status === 'UNSHIPPED'
          case 'unreceived':
            return order.status === 'UNRECEIVED'
          case 'unrated':
            return order.status === 'UNRATED'
          default:
            return true
        }
      })
    }

    setTimeout(() => {
      this.setData({
        orderList: [...this.data.orderList, ...filteredOrders],
        loading: false,
        finished: true
      })
    }, 500)
  },

  // 切换标签
  handleTabChange(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      type,
      orderList: [],
      finished: false,
      page: 1
    })
    this.loadOrderList()
  },

  // 加载更多
  loadMore() {
    this.loadOrderList()
  },

  // 订单点击
  handleOrderClick(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '订单详情页面开发中',
      icon: 'none'
    })
  },

  // 修改订单
  handleModify(e) {
    const order = e.currentTarget.dataset.order
    // 检查订单是否可以修改
    if (order.status !== 'UNPAID') {
      wx.showToast({
        title: '该订单状态下不可修改',
        icon: 'none'
      })
      return
    }

    wx.showActionSheet({
      itemList: ['修改收货地址', '修改商品规格'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.modifyAddress(order)
            break
          case 1:
            this.modifySpecs(order)
            break
        }
      }
    })
  },

  // 修改收货地址
  modifyAddress(order) {
    wx.showToast({
      title: '修改收货地址功能开发中',
      icon: 'none'
    })
  },

  // 修改商品规格
  modifySpecs(order) {
    wx.showToast({
      title: '修改商品规格功能开发中',
      icon: 'none'
    })
  },

  // 取消订单
  handleCancel(e) {
    const order = e.currentTarget.dataset.order
    if (order.status !== 'UNPAID') {
      wx.showToast({
        title: '该订单状态下不可取消',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '取消订单',
      content: '确定要取消该订单吗？取消后不可恢复',
      success: (res) => {
        if (res.confirm) {
          // 这里应该调用取消订单接口
          wx.showLoading({
            title: '取消中...'
          })
          
          setTimeout(() => {
            // 模拟取消成功
            const newOrderList = this.data.orderList.map(item => {
              if (item.id === order.id) {
                return {
                  ...item,
                  status: 'CANCELED',
                  statusText: '已取消'
                }
              }
              return item
            })
            
            this.setData({
              orderList: newOrderList
            })
            
            wx.hideLoading()
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            })
          }, 1000)
        }
      }
    })
  },

  // 继续支付
  handlePayAgain(e) {
    const order = e.currentTarget.dataset.order
    if (order.status !== 'UNPAID') {
      wx.showToast({
        title: '该订单不需要支付',
        icon: 'none'
      })
      return
    }

    // 调用支付接口前的确认
    wx.showModal({
      title: '确认付款',
      content: `需要支付：¥${order.totalPrice}`,
      confirmText: '立即支付',
      success: (res) => {
        if (res.confirm) {
          this.requestPayment(order)
        }
      }
    })
  },

  // 发起支付请求
  requestPayment(order) {
    wx.showLoading({
      title: '请求支付...'
    })

    // 这里应该调用后端接口获取支付参数
    setTimeout(() => {
      wx.hideLoading()
      
      // 模拟调用微信支付
      wx.requestPayment({
        timeStamp: String(Date.now()),
        nonceStr: 'nonceStr',
        package: 'prepay_id=wx123456789',
        signType: 'MD5',
        paySign: 'paySign',
        success: () => {
          // 支付成功后更新订单状态
          const newOrderList = this.data.orderList.map(item => {
            if (item.id === order.id) {
              return {
                ...item,
                status: 'PAID',
                statusText: '待发货'
              }
            }
            return item
          })
          
          this.setData({
            orderList: newOrderList
          })

          wx.showToast({
            title: '支付成功',
            icon: 'success'
          })
        },
        fail: (err) => {
          if (err.errMsg.indexOf('cancel') > -1) {
            wx.showToast({
              title: '支付已取消',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '支付失败',
              icon: 'error'
            })
          }
        }
      })
    }, 1000)
  }
})