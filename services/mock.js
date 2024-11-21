// 模拟后端数据
const mockData = {
  // 用户信息
  userInfo: {
    id: 1,
    nickname: '测试用户',
    avatar: '/assets/images/default-avatar.png',
    phone: '13800138000',
    email: 'test@example.com'
  },
  
  // 设置选项
  settings: {
    notifications: true,
    darkMode: false,
    language: 'zh_CN'
  },
  
  // 订单列表
  orders: [
    {
      id: 1,
      status: 'pending',
      amount: 99.00,
      createTime: '2024-03-20'
    },
    {
      id: 2,
      status: 'completed',
      amount: 199.00,
      createTime: '2024-03-19'
    }
  ],
  
  // 其他数据...
}

// 模拟 API 请求方法
const mockAPI = {
  // 获取用户信息
  getUserInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.userInfo)
      }, 100)
    })
  },

  // 获取设置
  getSettings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.settings)
      }, 100)
    })
  },

  // 获取订单列表
  getOrders() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.orders)
      }, 100)
    })
  }
}

export default mockAPI 