Page({
  data: {
    goodsList: [],
    totalPrice: 0,
    address: null,
    remark: ''
  },

  onLoad: function() {
    // 获取购物车传来的商品数据
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel) {
      eventChannel.on('acceptSelectedGoods', (data) => {
        const { selectedItems } = data
        if (selectedItems && selectedItems.length > 0) {
          this.setData({
            goodsList: selectedItems,
            totalPrice: this.calculateTotal(selectedItems)
          })
        }
      })
    }
    
    // 获取默认收货地址
    this.getDefaultAddress()
  },

  // 计算总价
  calculateTotal(goodsList) {
    return goodsList.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0).toFixed(2)
  },

  // 获取默认收货地址
  async getDefaultAddress() {
    try {
      const address = wx.getStorageSync('defaultAddress')
      if (address) {
        this.setData({ address })
      }
    } catch (error) {
      console.error('获取地址失败', error)
    }
  },

  // 选择收货地址
  handleChooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        const address = {
          name: res.userName,
          phone: res.telNumber,
          province: res.provinceName,
          city: res.cityName,
          district: res.countyName,
          detail: res.detailInfo
        }
        this.setData({ address })
        wx.setStorageSync('defaultAddress', address)
      },
      fail: (err) => {
        if (err.errMsg.indexOf('auth deny') >= 0) {
          wx.showModal({
            title: '提示',
            content: '请授权通讯地址权限',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        }
      }
    })
  },

  // 提交订单
  async handleSubmitOrder() {
    const { address, goodsList, totalPrice, remark } = this.data
    
    if (!address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return
    }

    try {
      // 创建订单
      const orderId = 'ORDER_' + Date.now()
      const orderInfo = {
        id: orderId,
        status: 'UNPAID', // 初始状态为未支付
        createTime: new Date().toISOString(),
        address,
        goodsList,
        totalPrice,
        remark
      }
      
      // 先保存订单
      const orderList = wx.getStorageSync('orderList') || []
      orderList.unshift(orderInfo)
      wx.setStorageSync('orderList', orderList)

      // 调用支付
      const payResult = await this.handlePayment(orderId, totalPrice)
      
      if (payResult.success) {
        // 支付成功，更新订单状态
        const updatedOrderList = orderList.map(item => {
          if (item.id === orderId) {
            return {
              ...item,
              status: 'PAID',
              payTime: new Date().toISOString()
            }
          }
          return item
        })
        wx.setStorageSync('orderList', updatedOrderList)

        // 从购物车中移除已购买的商品
        const cartList = wx.getStorageSync('cartList') || []
        const newCartList = cartList.filter(cartItem => 
          !goodsList.some(goodsItem => goodsItem.id === cartItem.id)
        )
        wx.setStorageSync('cartList', newCartList)

        wx.showToast({
          title: '支付成功',
          icon: 'success'
        })

        // 跳转到订单详情页
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/order/detail/index?id=${orderId}`
          })
        }, 1500)
      } else if (payResult.cancelled) {
        // 用户取消支付，跳转到订单列表的待付款标签页
        wx.showToast({
          title: '支付已取消',
          icon: 'none'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/order/list/index?type=unpaid'
          })
        }, 1000)
      } else {
        // 支付失败，跳转到订单列表的待付款标签页
        wx.showToast({
          title: '支付失败，请重试',
          icon: 'none'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/order/list/index?type=unpaid'
          })
        }, 1500)
      }

    } catch (error) {
      console.error('下单失败', error)
      wx.showToast({
        title: '下单失败，请重试',
        icon: 'none'
      })
    }
  },

  // 处理支付
  async handlePayment(orderId, totalPrice) {
    return new Promise((resolve) => {
      wx.showLoading({
        title: '正在支付...',
      })

      // 将价格转换为分
      const totalFee = Math.round(totalPrice * 100)

      // 构建支付参数
      const payParams = {
        timeStamp: '' + Math.floor(Date.now() / 1000),
        nonceStr: this.generateNonceStr(),
        package: 'prepay_id=wx20240220123456789abcdef0123456789',
        signType: 'MD5',
        paySign: 'mock_sign',
        success: () => {
          wx.hideLoading()
          resolve({ success: true })
        },
        fail: (err) => {
          wx.hideLoading()
          console.error('支付失败', err)
          if (err.errMsg.indexOf('cancel') > -1) {
            resolve({ success: false, cancelled: true })
          } else {
            resolve({ success: false, cancelled: false })
          }
        }
      }

      // 调用支付接口
      wx.requestPayment(payParams)
    })
  },

  // 生成随机字符串
  generateNonceStr(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  // 备注输入
  handleRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  }
}) 