// pages/order/logistics/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics: {
      company: '顺丰速运',
      trackingNo: 'SF1234567890',
      status: '运输中',
      tracks: [
        {
          desc: '【广州市】已签收，签收人：张三（本人签收）',
          time: '2024-02-20 14:30:00',
          status: 'signed'
        },
        {
          desc: '【广州市】快件已到达【广州天河区营业点】，正在派送中，快递员：李四',
          time: '2024-02-20 09:15:00',
          status: 'delivering',
          phone: '13800138000'
        },
        {
          desc: '【广州市】快件已到达【广州转运中心】',
          time: '2024-02-20 07:30:00',
          status: 'transport'
        },
        {
          desc: '【深圳市】快件已从【深圳转运中心】发出',
          time: '2024-02-19 20:45:00',
          status: 'transport'
        },
        {
          desc: '【深圳市】快件已到达【深圳转运中心】',
          time: '2024-02-19 18:30:00',
          status: 'transport'
        },
        {
          desc: '【深圳市】快件已从【深圳宝安区】发出',
          time: '2024-02-19 16:20:00',
          status: 'transport'
        },
        {
          desc: '【深圳市】快件已揽收，揽收人：王五',
          time: '2024-02-19 15:00:00',
          status: 'collected',
          phone: '13900139000'
        },
        {
          desc: '【深圳市】商家已发货',
          time: '2024-02-19 14:30:00',
          status: 'shipped'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    // 这里应该根据订单ID获取物流信息
    // this.loadLogisticsInfo(id)
    
    // 添加下拉刷新
    wx.startPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 模拟刷新物流信息
    setTimeout(() => {
      wx.showToast({
        title: '已更新',
        icon: 'success'
      })
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 复制运单号
  handleCopy() {
    wx.setClipboardData({
      data: this.data.logistics.trackingNo,
      success: () => {
        wx.showToast({
          title: '已复制运单号',
          icon: 'success'
        })
      }
    })
  },

  // 联系快递员
  handleContact(e) {
    const { phone } = e.currentTarget.dataset
    if (!phone) return
    
    wx.makePhoneCall({
      phoneNumber: phone,
      fail: () => {
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  }
})