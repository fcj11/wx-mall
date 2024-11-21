export const NotificationType = {
  ORDER: 'order',
  SYSTEM: 'system',
  PROMOTION: 'promotion'
}

export function sendNotification(type, content) {
  const notifications = wx.getStorageSync('notifications') || []
  notifications.unshift({
    id: Date.now(),
    type,
    content,
    time: new Date().toISOString(),
    read: false
  })
  wx.setStorageSync('notifications', notifications)
}

export function markAsRead(id) {
  const notifications = wx.getStorageSync('notifications') || []
  const updatedNotifications = notifications.map(item => {
    if (item.id === id) {
      return { ...item, read: true }
    }
    return item
  })
  wx.setStorageSync('notifications', updatedNotifications)
}

export function clearNotifications() {
  wx.removeStorageSync('notifications')
} 