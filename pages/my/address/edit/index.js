Page({
  data: {
    id: null,
    address: {
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    },
    region: ['', '', '']
  },

  onLoad(options) {
    const { id } = options
    if (id) {
      this.setData({ id })
      this.loadAddress(id)
    }
  },

  // 加载地址详情
  async loadAddress(id) {
    // 模拟加载数据
    await new Promise(resolve => setTimeout(resolve, 500))
    
    this.setData({
      address: {
        name: '张三',
        phone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detail: '科技园南路XX号',
        isDefault: true
      },
      region: ['广东省', '深圳市', '南山区']
    })
  },

  // 输入处理
  handleInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`address.${field}`]: e.detail.value
    })
  },

  // 地区选择
  handleRegionChange(e) {
    const region = e.detail.value
    this.setData({
      region,
      'address.province': region[0],
      'address.city': region[1],
      'address.district': region[2]
    })
  },

  // 默认地址切换
  handleDefaultChange(e) {
    this.setData({
      'address.isDefault': e.detail.value
    })
  },

  // 保存地址
  handleSave() {
    const { address } = this.data
    
    // 表单验证
    if (!address.name) {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none'
      })
      return
    }
    if (!address.phone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      })
      return
    }
    if (!/^1\d{10}$/.test(address.phone)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return
    }
    if (!address.province) {
      wx.showToast({
        title: '请选择所在地区',
        icon: 'none'
      })
      return
    }
    if (!address.detail) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return
    }

    // 模拟保存
    wx.showLoading({ title: '保存中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      })
    }, 1000)
  }
}) 