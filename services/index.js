import mockAPI from './mock'

// 统一的数据服务接口
const services = {
  // 获取用户信息
  async getUserInfo() {
    try {
      return await mockAPI.getUserInfo()
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  },

  // 获取设置
  async getSettings() {
    try {
      return await mockAPI.getSettings()
    } catch (error) {
      console.error('获取设置失败:', error)
      throw error
    }
  },

  // 获取订单列表
  async getOrders() {
    try {
      return await mockAPI.getOrders()
    } catch (error) {
      console.error('获取订单列表失败:', error)
      throw error
    }
  }
}

export default services 