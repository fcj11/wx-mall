Page({
  data: {
    orderId: '',
    order: null,
    serviceType: 'refund', // refund: 仅退款, return: 退货退款
    reason: '', // 退款原因
    amount: 0, // 退款金额
    description: '', // 问题描述
    images: [], // 图片凭证
    maxImageCount: 6 // 最大图片数量
  },

  onLoad(options) {
    const { id } = options
    this.setData({ orderId: id })
    this.loadOrderDetail(id)
  },

  // 加载订单详情
  loadOrderDetail(orderId) {
    const orderList = wx.getStorageSync('orderList') || []
    const order = orderList.find(item => item.id === orderId)
    if (order) {
      this.setData({
        order,
        amount: order.totalPrice
      })
    }
  },

  // 切换服务类型
  handleTypeChange(e) {
    this.setData({
      serviceType: e.detail.value
    })
  },

  // 选择退款原因
  handleReasonChange(e) {
    this.setData({
      reason: e.detail.value
    })
  },

  // 输入退款金额
  handleAmountInput(e) {
    let amount = parseFloat(e.detail.value)
    if (isNaN(amount) || amount < 0) amount = 0
    if (amount > this.data.order.totalPrice) {
      amount = this.data.order.totalPrice
    }
    this.setData({ amount })
  },

  // 输入问题描述
  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    })
  },

  // 上传图片
  handleUploadImage() {
    const { images, maxImageCount } = this.data
    wx.chooseImage({
      count: maxImageCount - images.length,
      success: (res) => {
        this.setData({
          images: [...images, ...res.tempFilePaths]
        })
      }
    })
  },

  // 删除图片
  handleDeleteImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data
    images.splice(index, 1)
    this.setData({ images })
  },

  // 预览图片
  handlePreviewImage(e) {
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      urls: this.data.images,
      current: url
    })
  },

  // 提交申请
  async handleSubmit() {
    const { order, serviceType, reason, amount, description, images } = this.data

    // 表单验证
    if (!reason) {
      wx.showToast({
        title: '请选择退款原因',
        icon: 'none'
      })
      return
    }

    if (amount <= 0) {
      wx.showToast({
        title: '请输入正确的退款金额',
        icon: 'none'
      })
      return
    }

    if (!description.trim()) {
      wx.showToast({
        title: '请填写问题描述',
        icon: 'none'
      })
      return
    }

    try {
      wx.showLoading({
        title: '提交中...'
      })

      // 构建售后记录
      const serviceRecord = {
        id: 'SERVICE_' + Date.now(),
        orderId: order.id,
        type: serviceType,
        reason,
        amount,
        description,
        images,
        status: 'PENDING',
        createTime: new Date().toISOString()
      }

      // 更新订单状态
      const orderList = wx.getStorageSync('orderList') || []
      const updatedOrderList = orderList.map(item => {
        if (item.id === order.id) {
          return {
            ...item,
            status: 'SERVICE',
            service: serviceRecord
          }
        }
        return item
      })

      wx.setStorageSync('orderList', updatedOrderList)

      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })

      // 返回订单详情页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

    } catch (error) {
      console.error('提交售后申请失败', error)
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  }
}) 