export function handleError(error, options = {}) {
  console.error(error)
  
  const { showToast = true, message = '操作失败，请重试' } = options
  
  if (showToast) {
    wx.showToast({
      title: message,
      icon: 'none'
    })
  }
  
  // 可以添加错误上报逻辑
} 