// pages/my/settings/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    settings: {
      notification: true,
      sound: true,
      vibrate: true,
      theme: 'light'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadSettings()
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

  // 加载设置
  loadSettings() {
    const settings = wx.getStorageSync('userSettings')
    if (settings) {
      this.setData({ settings })
    }
  },

  // 切换设置项
  handleSettingChange(e) {
    const { key } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`settings.${key}`]: value
    }, () => {
      wx.setStorageSync('userSettings', this.data.settings)
    })
  },

  // 清除缓存
  handleClearCache() {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              wx.showToast({
                title: '清除成功',
                icon: 'success'
              })
            }
          })
        }
      }
    })
  },

  // 退出登录
  handleLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
})