Page({
  data: {
    keyword: '',
    historyList: [],
    hotList: ['手机', '电脑', '耳机', '平板', '相机'],
    searchSuggestions: [],
    showDropdown: false,
    timer: null
  },

  onLoad() {
    this.loadHistory()
  },

  // 加载搜索历史
  loadHistory() {
    const historyList = wx.getStorageSync('searchHistory') || []
    this.setData({ historyList })
  },

  // 保存搜索历史
  saveHistory(keyword) {
    let historyList = wx.getStorageSync('searchHistory') || []
    // 去重
    historyList = historyList.filter(item => item !== keyword)
    // 添加到开头
    historyList.unshift(keyword)
    // 最多保存10条
    historyList = historyList.slice(0, 10)
    
    wx.setStorageSync('searchHistory', historyList)
    this.setData({ historyList })
  },

  // 清空历史
  handleClearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory')
          this.setData({ historyList: [] })
        }
      }
    })
  },

  // 输入搜索关键词
  handleInput(e) {
    const keyword = e.detail.value.trim()
    this.setData({ keyword })
    
    // 防抖处理
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    
    if (keyword) {
      this.data.timer = setTimeout(() => {
        this.getSuggestions(keyword)
      }, 300)
    } else {
      this.setData({ 
        showDropdown: false,
        searchSuggestions: []
      })
    }
  },

  // 获取搜索建议
  async getSuggestions(keyword) {
    try {
      // 模拟搜索建议请求
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 模拟搜索建议数据
      const suggestions = [
        `${keyword}手机`,
        `${keyword}平板`,
        `${keyword}电脑`,
        `${keyword}配件`,
        `${keyword}耳机`
      ]

      this.setData({
        searchSuggestions: suggestions,
        showDropdown: true
      })

    } catch (error) {
      console.error('获取搜索建议失败', error)
    }
  },

  // 点击搜索建议
  handleSuggestionClick(e) {
    const { keyword } = e.currentTarget.dataset
    this.setData({ 
      keyword,
      showDropdown: false
    })
    this.saveHistory(keyword)
    this.search(keyword)
  },

  // 清空输入
  handleClear() {
    this.setData({
      keyword: '',
      showDropdown: false,
      searchSuggestions: []
    })
  },

  // 取消搜索
  handleCancel() {
    wx.navigateBack()
  },

  // 点击搜索
  handleSearch() {
    const { keyword } = this.data
    if (!keyword.trim()) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }
    
    this.saveHistory(keyword)
    this.search(keyword)
  },

  // 点击历史或热门搜索
  handleSearchItem(e) {
    const { keyword } = e.currentTarget.dataset
    this.setData({ keyword })
    this.search(keyword)
  },

  // 搜索商品
  async search(keyword) {
    this.setData({ 
      loading: true,
      showResult: true
    })

    try {
      // 模拟搜索请求
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟搜索结果
      const searchResult = Array(5).fill(0).map((_, index) => ({
        id: Date.now() + index,
        title: `${keyword}相关商品${index + 1}`,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        price: (Math.random() * 1000 + 99).toFixed(2),
        sales: Math.floor(Math.random() * 1000)
      }))

      this.setData({ searchResult })

    } catch (error) {
      console.error('搜索失败', error)
      wx.showToast({
        title: '搜索失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 点击商品
  handleGoodsClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/goods/detail/index?id=${id}`
    })
  }
}) 