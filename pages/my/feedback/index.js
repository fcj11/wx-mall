Page({
  data: {
    type: 'bug', // bug: 问题反馈, suggestion: 功能建议, other: 其他
    content: '',
    images: [],
    contact: '',
    maxImageCount: 4,
    submitDisabled: true,
    feedbackTypes: [
      {
        value: 'bug',
        label: '问题反馈',
        icon: '🐛',
        desc: '遇到使用问题或系统故障'
      },
      {
        value: 'suggestion',
        label: '功能建议',
        icon: '💡',
        desc: '对产品功能的改进建议'
      },
      {
        value: 'other',
        label: '其他',
        icon: '💬',
        desc: '其他相关问题或建议'
      }
    ]
  },

  // 切换反馈类型
  handleTypeChange(e) {
    const { type } = e.currentTarget.dataset
    this.setData({ type })
    this.checkSubmitStatus()
  },

  // 输入反馈内容
  handleContentInput(e) {
    const content = e.detail.value.trim()
    this.setData({ content })
    this.checkSubmitStatus()
  },

  // 输入联系方式
  handleContactInput(e) {
    const contact = e.detail.value.trim()
    this.setData({ contact })
    this.checkSubmitStatus()
  },

  // 检查提交按钮状态
  checkSubmitStatus() {
    const { content } = this.data
    this.setData({
      submitDisabled: !content
    })
  },

  // 上传图片
  handleUploadImage() {
    const { images, maxImageCount } = this.data
    wx.chooseImage({
      count: maxImageCount - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: [...images, ...res.tempFilePaths]
        })
      }
    })
  },

  // 预览图片
  handlePreviewImage(e) {
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      urls: this.data.images,
      current: url
    })
  },

  // 删除图片
  handleDeleteImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data
    images.splice(index, 1)
    this.setData({ images })
  },

  // 提交反馈
  async handleSubmit() {
    if (this.data.submitDisabled) return

    const { type, content, images, contact } = this.data

    try {
      wx.showLoading({
        title: '提交中...'
      })

      // 构建反馈记录
      const feedback = {
        id: Date.now(),
        type,
        content,
        images,
        contact,
        status: 'pending',
        createTime: new Date().toISOString()
      }

      // 保存反馈记录
      const feedbackList = wx.getStorageSync('feedbackList') || []
      feedbackList.unshift(feedback)
      wx.setStorageSync('feedbackList', feedbackList)

      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

    } catch (error) {
      console.error('提交反馈失败', error)
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    } finally {
      wx.hideLoading()
    }
  }
}) 