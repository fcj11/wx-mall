Page({
  data: {
    cartList: [],
    isEdit: false,
    allChecked: false,
    totalPrice: 0,
    selectedCount: 0
  },

  onLoad() {
    // 页面加载时获取购物车数据
    this.loadCartData()
  },

  onShow() {
    // 每次显示页面时重新计算总价
    this.calculateTotal()
  },

  // 加载购物车数据
  async loadCartData() {
    try {
      wx.showLoading({
        title: '加载中...',
      })
      
      // 从本地存储获取购物车数据
      const cartData = wx.getStorageSync('cartList') || []
      
      if (cartData.length > 0) {
        this.setData({
          cartList: cartData
        }, () => {
          this.calculateTotal()
        })
      } else {
        // 如果本地没有数据，使用模拟数据（实际项目中应该调用接口）
        const mockCartList = Array(5).fill(0).map((_, index) => ({
          id: index + 1,
          title: `商品${index + 1}`,
          image: 'https://img.yzcdn.cn/vant/cat.jpeg',
          specs: '规格：默认',
          price: (Math.random() * 1000 + 99).toFixed(2),
          quantity: 1,
          checked: false
        }))
        
        this.setData({
          cartList: mockCartList
        }, () => {
          this.calculateTotal()
          // 保存到本地存储
          wx.setStorageSync('cartList', mockCartList)
        })
      }
    } catch (error) {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 添加商品到购物车
  addToCart(goods) {
    const { cartList } = this.data
    const existingGoodsIndex = cartList.findIndex(item => item.id === goods.id)

    if (existingGoodsIndex > -1) {
      // 商品已存在，增加数量
      cartList[existingGoodsIndex].quantity += 1
    } else {
      // 商品不存在，添加新商品
      cartList.push({
        ...goods,
        quantity: 1,
        checked: false
      })
    }

    this.setData({ cartList }, () => {
      this.calculateTotal()
      // 更新本地存储
      wx.setStorageSync('cartList', cartList)
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
    })
  },

  // 切换编辑模式
  handleEdit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },

  // 选择单个商品
  handleCheck(e) {
    const { index } = e.currentTarget.dataset
    const { cartList } = this.data
    cartList[index].checked = !cartList[index].checked
    
    this.setData({ cartList }, () => {
      this.calculateTotal()
    })
  },

  // 全选/取消全选
  handleSelectAll() {
    const { cartList, allChecked } = this.data
    const newCartList = cartList.map(item => ({
      ...item,
      checked: !allChecked
    }))
    
    this.setData({
      cartList: newCartList,
      allChecked: !allChecked
    }, () => {
      this.calculateTotal()
    })
  },

  // 减少数量
  handleMinus(e) {
    const { index } = e.currentTarget.dataset
    const { cartList } = this.data
    if (cartList[index].quantity <= 1) return
    
    cartList[index].quantity--
    this.setData({ cartList }, () => {
      this.calculateTotal()
      wx.setStorageSync('cartList', cartList)
    })
  },

  // 增加数量
  handlePlus(e) {
    const { index } = e.currentTarget.dataset
    const { cartList } = this.data
    cartList[index].quantity++
    
    this.setData({ cartList }, () => {
      this.calculateTotal()
      wx.setStorageSync('cartList', cartList)
    })
  },

  // 输入数量
  handleQuantityInput(e) {
    const { index } = e.currentTarget.dataset
    let value = parseInt(e.detail.value)
    if (isNaN(value) || value < 1) value = 1
    
    const { cartList } = this.data
    cartList[index].quantity = value
    
    this.setData({ cartList }, () => {
      this.calculateTotal()
    })
  },

  // 计算总价和选中数量
  calculateTotal() {
    const { cartList } = this.data
    let totalPrice = 0
    let selectedCount = 0
    
    cartList.forEach(item => {
      if (item.checked) {
        totalPrice += item.price * item.quantity
        selectedCount += item.quantity
      }
    })

    this.setData({
      totalPrice: totalPrice.toFixed(2),
      selectedCount,
      // 判断是否全选
      allChecked: cartList.length > 0 && cartList.every(item => item.checked)
    })
  },

  // 删除选中商品
  handleDelete() {
    const { cartList } = this.data
    const selectedItems = cartList.filter(item => item.checked)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择要删除的商品',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '提示',
      content: '确定要删除选中商品吗？',
      success: (res) => {
        if (res.confirm) {
          const newCartList = cartList.filter(item => !item.checked)
          this.setData({
            cartList: newCartList,
            isEdit: false
          }, () => {
            this.calculateTotal()
            // 更新本地存储
            wx.setStorageSync('cartList', newCartList)
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
          })
        }
      }
    })
  },

  // 结算
  handleCheckout() {
    const { cartList } = this.data
    const selectedItems = cartList.filter(item => item.checked)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'none'
      })
      return
    }

    // 使用同步的方式跳转
    wx.navigateTo({
      url: '/pages/checkout/index',
      events: {
        // 监听结算页面发送回来的事件
        checkoutSuccess: () => {
          // 结算成功后的回调
          this.loadCartData()
        }
      },
      success: (res) => {
        // 向结算页面传递数据
        res.eventChannel.emit('acceptSelectedGoods', { selectedItems })
      },
      fail: (error) => {
        console.error('跳转失败', error)
        wx.showToast({
          title: '跳转失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  // 去购物
  handleGoShopping() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  // 点击商品跳转详情
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 