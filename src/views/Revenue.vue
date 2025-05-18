<template>
  <div class="revenue-container">
    <el-row :gutter="20" class="mb-4">
      <el-col :span="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>Total Revenue</span>
            </div>
          </template>
          <div class="stat-value">${{ formatNumber(totalRevenue) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>Total Orders</span>
            </div>
          </template>
          <div class="stat-value">{{ totalOrders }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>Average Order Value</span>
            </div>
          </template>
          <div class="stat-value">${{ formatNumber(averageOrderValue) }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>Growth Rate</span>
            </div>
          </template>
          <div class="stat-value" :class="{ 'positive': growthRate > 0, 'negative': growthRate < 0 }">
            {{ growthRate }}%
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mb-4">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Revenue Trends</span>
              <el-radio-group v-model="timeRange" size="small" @change="handleTimeRangeChange">
                <el-radio-button label="daily">Daily</el-radio-button>
                <el-radio-button label="monthly">Monthly</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <LineChart :data="revenueChartData" :options="chartOptions" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Revenue by Category</span>
            </div>
          </template>
          <div class="chart-container">
            <DoughnutChart :data="categoryChartData" :options="categoryChartOptions" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Orders by Category</span>
            </div>
          </template>
          <div class="chart-container">
            <BarChart :data="ordersChartData" :options="barChartOptions" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Line as LineChart, Doughnut as DoughnutChart, Bar as BarChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

const store = useStore()
const timeRange = ref('daily')

const totalRevenue = computed(() => store.getters['revenue/getTotalRevenue'])
const totalOrders = computed(() => store.getters['revenue/getTotalOrders'])
const revenueData = computed(() => store.getters['revenue/getRevenueData'])
const categoryData = computed(() => store.getters['revenue/getCategoryData'])

const averageOrderValue = computed(() => {
  return totalOrders.value ? totalRevenue.value / totalOrders.value : 0
})

const growthRate = computed(() => {
  // Simulated growth rate calculation
  return 15.5
})

const revenueChartData = computed(() => ({
  labels: revenueData.value.labels,
  datasets: [
    {
      label: 'Revenue',
      data: revenueData.value.revenue,
      borderColor: '#409EFF',
      tension: 0.4
    },
    {
      label: 'Orders',
      data: revenueData.value.orders,
      borderColor: '#67C23A',
      tension: 0.4
    }
  ]
}))

const categoryChartData = computed(() => ({
  labels: categoryData.value.labels,
  datasets: [{
    data: categoryData.value.revenue,
    backgroundColor: [
      '#409EFF',
      '#67C23A',
      '#E6A23C',
      '#F56C6C',
      '#909399'
    ]
  }]
}))

const ordersChartData = computed(() => ({
  labels: categoryData.value.labels,
  datasets: [{
    label: 'Orders',
    data: categoryData.value.revenue.map(v => Math.floor(v / 100)),
    backgroundColor: '#409EFF'
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    }
  }
}

const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right'
    }
  }
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}

const handleTimeRangeChange = (value) => {
  store.dispatch('revenue/changeTimeRange', value)
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)
}

onMounted(() => {
  store.dispatch('revenue/initializeData')
})
</script>

<style lang="scss" scoped>
.revenue-container {
  .mb-4 {
    margin-bottom: 20px;
  }

  .stat-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #303133;

      &.positive {
        color: #67C23A;
      }

      &.negative {
        color: #F56C6C;
      }
    }
  }

  .chart-container {
    height: 300px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style> 