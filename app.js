App({
  onLaunch() {
    // 初始化地址数据
    this.initAddressData()
  },

  // 初始化地址数据
  initAddressData() {
    let addresses = wx.getStorageSync('addresses') || []
    
    // 如果没有地址数据，添加示例数据
    if (addresses.length === 0) {
      addresses = [
        {
          id: '1',
          name: '张三',
          phone: '13800138000',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detail: '科技园南路88号xx大厦A座10层1001室',
          isDefault: true
        },
        {
          id: '2',
          name: '李四',
          phone: '13900139000',
          province: '广东省',
          city: '广州市',
          district: '天河区',
          detail: '天河路100号xx广场B座20层2001室',
          isDefault: false
        },
        {
          id: '3',
          name: '王五',
          phone: '13700137000',
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          detail: '朝阳路50号xx中心C座15层1502室',
          isDefault: false
        },
        {
          id: '4',
          name: '赵六',
          phone: '13600136000',
          province: '上海市',
          city: '上海市',
          district: '浦东新区',
          detail: '浦东大道200号xx大厦D座25层2503室',
          isDefault: false
        }
      ]
      
      wx.setStorageSync('addresses', addresses)
    }
  },

  globalData: {
    userInfo: null,
    collectionUpdated: false
  }
}) 