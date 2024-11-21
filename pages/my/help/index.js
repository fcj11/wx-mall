Page({
  data: {
    searchValue: '',
    hotQuestions: [
      '如何修改收货地址？',
      '如何申请退款？',
      '如何查看物流信息？',
      '如何修改订单？',
      '如何联系客服？'
    ],
    categories: [
      {
        title: '常见问题',
        icon: '❓',
        questions: [
          {
            title: '如何修改收货地址？',
            content: '在订单详情页面点击"修改"按钮，即可修改收货地址。如果订单已发货，则无法修改地址。'
          },
          {
            title: '如何申请退款？',
            content: '在订单详情页面点击"申请退款"按钮，按提示填写退款原因和上传凭证即可。'
          },
          {
            title: '如何查看物流信息？',
            content: '在订单详情页面点击"查看物流"，可以查看最新的物流跟踪信息。'
          }
        ]
      },
      {
        title: '支付相关',
        icon: '💰',
        questions: [
          {
            title: '支持哪些支付方式？',
            content: '目前支持微信支付、支付宝支付等多种支付方式。'
          },
          {
            title: '支付失败怎么办？',
            content: '请检查网络连接和账户余额，如果问题持续，请联系客服处理。'
          },
          {
            title: '能开具发票吗？',
            content: '可以，在订单详情页面申请开具电子发票或纸质发票。'
          }
        ]
      },
      {
        title: '售后服务',
        icon: '🛠️',
        questions: [
          {
            title: '退款多久能到账？',
            content: '退款申请审核通过后，一般1-3个工作日内到账。'
          },
          {
            title: '如何查看退款进度？',
            content: '在订单详情页面可以查看退款进度。'
          },
          {
            title: '商品损坏了怎么办？',
            content: '请及时拍照保留证据，联系客服申请退换货。'
          }
        ]
      }
    ],
    expandedQuestions: []
  },

  // 搜索问题
  handleSearch(e) {
    const value = e.detail.value.trim().toLowerCase()
    if (!value) return

    const results = []
    this.data.categories.forEach(category => {
      category.questions.forEach(question => {
        if (question.title.toLowerCase().includes(value) || 
            question.content.toLowerCase().includes(value)) {
          results.push(question)
        }
      })
    })

    this.setData({
      searchResults: results,
      showSearchResults: true
    })
  },

  // 清空搜索
  handleClearSearch() {
    this.setData({
      searchValue: '',
      showSearchResults: false,
      searchResults: []
    })
  },

  // 点击热门问题
  handleHotQuestion(e) {
    const { question } = e.currentTarget.dataset
    this.setData({
      searchValue: question
    })
    this.handleSearch({ detail: { value: question } })
  },

  // 展开/收起问题
  handleToggleQuestion(e) {
    const { categoryIndex, questionIndex } = e.currentTarget.dataset
    const key = `${categoryIndex}-${questionIndex}`
    const { expandedQuestions } = this.data
    
    if (expandedQuestions.includes(key)) {
      this.setData({
        expandedQuestions: expandedQuestions.filter(item => item !== key)
      })
    } else {
      this.setData({
        expandedQuestions: [...expandedQuestions, key]
      })
    }
  },

  // 联系客服
  handleContact() {
    // 实际项目中可以跳转到客服会话或拨打客服电话
    wx.makePhoneCall({
      phoneNumber: '400-123-4567',
      fail: () => {
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  }
}) 