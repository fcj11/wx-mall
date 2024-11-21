// pages/my/settings/account/phone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    countdown: 0,
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    // 页面卸载时清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

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

  // 输入手机号
  handlePhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 输入验证码
  handleCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 发送验证码
  handleSendCode() {
    const { phone, countdown } = this.data
    if (countdown > 0) return

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    // 模拟发送验证码
    wx.showLoading({
      title: '发送中...'
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      })

      // 开始倒计时
      this.setData({ countdown: 60 })
      this.startCountdown()
    }, 1000)
  },

  // 倒计时
  startCountdown() {
    if (this.data.timer) {
      clearInterval(this.data.timer)
    }

    const timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(timer)
        this.setData({ countdown: 0 })
      } else {
        this.setData({
          countdown: this.data.countdown - 1
        })
      }
    }, 1000)

    this.setData({ timer })
  },

  // 提交绑定
  handleSubmit() {
    const { phone, code } = this.data

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    if (!/^\d{6}$/.test(code)) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none'
      })
      return
    }

    // 模拟绑定
    wx.showLoading({
      title: '绑定中...'
    })

    setTimeout(() => {
      // 更新用户信息
      const userInfo = wx.getStorageSync('userInfo') || {}
      userInfo.phone = phone
      wx.setStorageSync('userInfo', userInfo)

      wx.showToast({
        title: '绑定成功',
        icon: 'success'
      })

      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  }
})