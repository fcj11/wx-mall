Page({
  data: {
    id: '',
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false,
    region: ['请选择', '请选择', '请选择'],
    isEdit: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ isEdit: true })
      this.loadAddressDetail(options.id)
    }
  },

  // 加载地址详情
  loadAddressDetail(id) {
    const addresses = wx.getStorageSync('addresses') || []
    const address = addresses.find(item => item.id === id)
    if (address) {
      this.setData({
        id: address.id,
        name: address.name,
        phone: address.phone,
        province: address.province,
        city: address.city,
        district: address.district,
        detail: address.detail,
        isDefault: address.isDefault,
        region: [address.province, address.city, address.district]
      })
    }
  },

  // 保存地址
  handleSave() {
    const { name, phone, region, detail, isDefault } = this.data
    
    // 表单验证
    if (!name || !phone || !detail || region[0] === '请选择') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 手机号验证
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    let addresses = wx.getStorageSync('addresses') || []
    
    if (this.data.isEdit) {
      // 编辑地址
      addresses = addresses.map(item => {
        if (item.id === this.data.id) {
          return {
            ...item,
            name,
            phone,
            province: region[0],
            city: region[1],
            district: region[2],
            detail,
            isDefault
          }
        }
        return isDefault ? { ...item, isDefault: false } : item
      })
    } else {
      // 新增地址
      const newAddress = {
        id: Date.now().toString(),
        name,
        phone,
        province: region[0],
        city: region[1],
        district: region[2],
        detail,
        isDefault
      }
      
      if (isDefault) {
        addresses = addresses.map(item => ({ ...item, isDefault: false }))
      }
      addresses.unshift(newAddress)
    }
    
    wx.setStorageSync('addresses', addresses)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  // 地区选择
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },

  // 默认地址切换
  handleDefaultChange(e) {
    this.setData({
      isDefault: e.detail.value
    })
  }
}) 