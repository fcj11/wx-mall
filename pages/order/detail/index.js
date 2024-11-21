// pages/order/detail/index.js
Page({
  data: {
    order: null,
    loading: true,
    shareData: {
      title: '分享订单',
      path: '/pages/order/detail/index',
      imageUrl: '' // 分享图片
    }
  },

  onLoad(options) {
    const { id } = options
    this.loadOrderDetail(id)
  },

  // 加载订单详情
  loadOrderDetail(orderId) {
    const orderList = wx.getStorageSync('orderList') || []
    const order = orderList.find(item => item.id === orderId)
    
    if (order) {
      // 更新分享数据
      const shareData = {
        title: `分享订单：${order.goodsList[0].title}`,
        path: `/pages/order/detail/index?id=${order.id}`,
        imageUrl: order.goodsList[0].image
      }

      this.setData({
        order,
        loading: false,
        shareData
      })
    } else {
      wx.showToast({
        title: '订单不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 分享给朋友
  onShareAppMessage() {
    return this.data.shareData
  },

  // 分享到朋友圈
  onShareTimeline() {
    return this.data.shareData
  },

  // 生成分享海报
  async handleCreatePoster() {
    const { order } = this.data
    if (!order) return

    wx.showLoading({
      title: '生成中...'
    })

    try {
      // 创建画布上下文
      const ctx = wx.createCanvasContext('sharePoster')

      // 绘制背景
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(0, 0, 750, 1000)

      // 绘制商品图片
      const goodsImage = order.goodsList[0].image
      await this.drawImage(ctx, goodsImage, 30, 30, 200, 200)

      // 绘制商品信息
      ctx.setFontSize(28)
      ctx.setFillStyle('#333333')
      ctx.fillText(order.goodsList[0].title, 250, 60)

      ctx.setFontSize(24)
      ctx.setFillStyle('#999999')
      ctx.fillText(order.goodsList[0].specs, 250, 100)

      ctx.setFontSize(32)
      ctx.setFillStyle('#ff2d4a')
      ctx.fillText(`¥${order.totalPrice}`, 250, 150)

      // 绘制二维码
      const qrCode = await this.generateQRCode(`/pages/order/detail/index?id=${order.id}`)
      await this.drawImage(ctx, qrCode, 30, 800, 150, 150)

      // 绘制提示文字
      ctx.setFontSize(24)
      ctx.setFillStyle('#666666')
      ctx.fillText('长按识别二维码查看详情', 200, 875)

      // 绘制完成
      ctx.draw(true, () => {
        // 导出图片
        wx.canvasToTempFilePath({
          canvasId: 'sharePoster',
          success: (res) => {
            // 保存图片到相册
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                wx.showToast({
                  title: '已保存到相册',
                  icon: 'success'
                })
              },
              fail: () => {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          },
          fail: () => {
            wx.showToast({
              title: '生成失败',
              icon: 'none'
            })
          }
        })
      })

    } catch (error) {
      console.error('生成海报失败', error)
      wx.showToast({
        title: '生成失败',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  },

  // 工具方法：绘制图片
  drawImage(ctx, src, x, y, width, height) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success: (res) => {
          ctx.drawImage(res.path, x, y, width, height)
          resolve()
        },
        fail: reject
      })
    })
  },

  // 工具方法：生成二维码
  generateQRCode(path) {
    return new Promise((resolve, reject) => {
      // 这里应该调用后端接口生成二维码
      // 暂时返回一个示例图片
      resolve('https://example.com/qr-code.png')
    })
  }
})