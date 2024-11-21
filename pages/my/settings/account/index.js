import services from '../../../../services/index'

Page({
  data: {
    userInfo: null,
    menuList: [
      {
        title: '修改密码',
        url: '/pages/my/settings/account/password/index'
      },
      {
        title: '绑定手机',
        url: '/pages/my/settings/account/phone/index'
      },
      {
        title: '实名认证',
        url: '/pages/my/settings/account/realname/index'
      }
    ]
  },

  onLoad() {
    this.loadUserInfo()
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ userInfo })
  },

  handleMenuItem(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({ url })
  }
}) 