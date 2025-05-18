// Sample data for demonstration
const sampleData = {
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    revenue: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
    orders: [45, 62, 51, 68, 59, 78, 72]
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [45000, 52000, 48000, 55000, 51000, 58000],
    orders: [1500, 1700, 1600, 1800, 1700, 1900]
  },
  categories: {
    labels: ['Electronics', 'Clothing', 'Home', 'Books', 'Sports'],
    revenue: [35000, 28000, 22000, 15000, 18000]
  }
}

export default {
  namespaced: true,
  state: {
    timeRange: 'daily',
    revenueData: sampleData.daily,
    categoryData: sampleData.categories,
    totalRevenue: 0,
    totalOrders: 0
  },
  mutations: {
    SET_TIME_RANGE(state, range) {
      state.timeRange = range
      state.revenueData = sampleData[range]
    },
    UPDATE_TOTALS(state) {
      state.totalRevenue = state.revenueData.revenue.reduce((a, b) => a + b, 0)
      state.totalOrders = state.revenueData.orders.reduce((a, b) => a + b, 0)
    }
  },
  actions: {
    changeTimeRange({ commit }, range) {
      commit('SET_TIME_RANGE', range)
      commit('UPDATE_TOTALS')
    },
    initializeData({ commit }) {
      commit('UPDATE_TOTALS')
    }
  },
  getters: {
    getRevenueData: state => state.revenueData,
    getCategoryData: state => state.categoryData,
    getTotalRevenue: state => state.totalRevenue,
    getTotalOrders: state => state.totalOrders
  }
} 