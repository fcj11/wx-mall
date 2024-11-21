export function trackEvent(eventName, params = {}) {
  try {
    // 记录用户行为
    const events = wx.getStorageSync('userEvents') || []
    events.push({
      eventName,
      params,
      timestamp: Date.now()
    })
    wx.setStorageSync('userEvents', events)

    // 实际项目中应该上报到统计服务器
    console.log('Track Event:', eventName, params)
  } catch (error) {
    console.error('Track Event Error:', error)
  }
}

export function trackPageView(pagePath, params = {}) {
  trackEvent('page_view', {
    page: pagePath,
    ...params
  })
}

export function trackOrder(orderId, amount, items) {
  trackEvent('place_order', {
    orderId,
    amount,
    items
  })
} 