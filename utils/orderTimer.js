export const ORDER_TIMEOUT = 30 * 60 * 1000 // 30分钟

export function setupOrderTimeout(orderId) {
  const timeoutKey = `order_timeout_${orderId}`
  const timeout = setTimeout(() => {
    cancelOrder(orderId)
  }, ORDER_TIMEOUT)
  
  wx.setStorageSync(timeoutKey, timeout)
}

export function cancelOrder(orderId) {
  const orderList = wx.getStorageSync('orderList') || []
  const updatedOrderList = orderList.map(item => {
    if (item.id === orderId && item.status === 'UNPAID') {
      return {
        ...item,
        status: 'CANCELLED',
        cancelTime: new Date().toISOString(),
        cancelReason: '超时未支付，系统自动取消'
      }
    }
    return item
  })
  
  wx.setStorageSync('orderList', updatedOrderList)
}

export function clearOrderTimeout(orderId) {
  const timeoutKey = `order_timeout_${orderId}`
  const timeout = wx.getStorageSync(timeoutKey)
  if (timeout) {
    clearTimeout(timeout)
    wx.removeStorageSync(timeoutKey)
  }
} 