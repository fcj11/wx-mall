export const ORDER_STATUS = {
  UNPAID: 'UNPAID',      // 待付款
  PAID: 'PAID',          // 已付款
  SHIPPED: 'SHIPPED',    // 已发货
  RECEIVED: 'RECEIVED',  // 已收货
  COMPLETED: 'COMPLETED',// 已完成
  CANCELLED: 'CANCELLED' // 已取消
}

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.UNPAID]: '等待买家付款',
  [ORDER_STATUS.PAID]: '等待商家发货',
  [ORDER_STATUS.SHIPPED]: '等待买家收货',
  [ORDER_STATUS.RECEIVED]: '等待买家评价',
  [ORDER_STATUS.COMPLETED]: '交易完成',
  [ORDER_STATUS.CANCELLED]: '交易关闭'
} 