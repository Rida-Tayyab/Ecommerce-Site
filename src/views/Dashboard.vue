<template>
  <div class="dashboard-container">
    <!-- Statistics Cards -->
    <el-row :gutter="24" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3>Total Revenue</h3>
              <div class="stat-value">${{ totalRevenue.toLocaleString() }}</div>
              <div class="stat-change" :class="{ 'positive': revenueChange > 0, 'negative': revenueChange < 0 }">
                {{ revenueChange > 0 ? '+' : '' }}{{ revenueChange }}%
              </div>
            </div>
            <el-icon class="stat-icon"><Money /></el-icon>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3>Total Orders</h3>
              <div class="stat-value">{{ totalOrders }}</div>
              <div class="stat-change" :class="{ 'positive': ordersChange > 0, 'negative': ordersChange < 0 }">
                {{ ordersChange > 0 ? '+' : '' }}{{ ordersChange }}%
              </div>
            </div>
            <el-icon class="stat-icon"><ShoppingCart /></el-icon>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3>Low Stock Items</h3>
              <div class="stat-value">{{ lowStockCount }}</div>
              <div class="stat-change negative">
                {{ lowStockChange }}% from threshold
              </div>
            </div>
            <el-icon class="stat-icon"><Warning /></el-icon>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <h3>Total Products</h3>
              <div class="stat-value">{{ totalProducts }}</div>
              <div class="stat-change" :class="{ 'positive': productsChange > 0, 'negative': productsChange < 0 }">
                {{ productsChange > 0 ? '+' : '' }}{{ productsChange }}%
              </div>
            </div>
            <el-icon class="stat-icon"><Goods /></el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Charts Row -->
    <el-row :gutter="24" class="charts-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>Revenue Overview</h3>
              <el-radio-group v-model="timeRange" size="small">
                <el-radio-button label="week">Week</el-radio-button>
                <el-radio-button label="month">Month</el-radio-button>
                <el-radio-button label="year">Year</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <Line :data="revenueChartData" :options="revenueChartOptions" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <h3>Top Categories</h3>
            </div>
          </template>
          <div class="chart-container">
            <Doughnut :data="categoryChartData" :options="categoryChartOptions" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Low Stock Alerts -->
    <el-card class="alerts-card">
      <template #header>
        <div class="card-header">
          <h3>Low Stock Alerts</h3>
          <el-button type="primary" size="small" @click="$router.push('/inventory')">
            View All Inventory
          </el-button>
        </div>
      </template>
      <el-table :data="lowStockItems" style="width: 100%">
        <el-table-column prop="name" label="Product" />
        <el-table-column prop="category" label="Category" />
        <el-table-column prop="stock" label="Current Stock" />
        <el-table-column prop="lowStockThreshold" label="Threshold" />
        <el-table-column label="Status">
          <template #default>
            <el-tag type="danger">Low Stock</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Line, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Money, ShoppingCart, Warning, Goods } from '@element-plus/icons-vue'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const store = useStore()
const timeRange = ref('month')

// Mock data for demonstration
const totalRevenue = ref(125000)
const revenueChange = ref(12.5)
const totalOrders = ref(1250)
const ordersChange = ref(8.3)
const lowStockCount = ref(5)
const lowStockChange = ref(15)
const totalProducts = ref(150)
const productsChange = ref(5.2)

// Computed properties
const lowStockItems = computed(() => {
  const inventory = store.state.inventory?.products || []
  return inventory.filter(item => item.stock <= item.lowStockThreshold)
})

// Chart data
const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 45000, 35000, 50000, 49000, 60000],
      borderColor: '#409EFF',
      tension: 0.4
    }
  ]
}

const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => `$${value.toLocaleString()}`
      }
    }
  }
}

const categoryChartData = {
  labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Accessories'],
  datasets: [
    {
      data: [40, 20, 25, 15],
      backgroundColor: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C']
    }
  ]
}

const categoryChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);

  .stats-row {
    margin-bottom: 24px;
  }

  .stat-card {
    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stat-info {
        h3 {
          margin: 0 0 8px;
          font-size: 14px;
          color: #909399;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 4px;
        }

        .stat-change {
          font-size: 12px;
          &.positive {
            color: #67C23A;
          }
          &.negative {
            color: #F56C6C;
          }
        }
      }

      .stat-icon {
        font-size: 48px;
        color: #409EFF;
        opacity: 0.2;
      }
    }
  }

  .charts-row {
    margin-bottom: 24px;
  }

  .chart-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }

    .chart-container {
      height: 300px;
    }
  }

  .alerts-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #303133;
      }
    }
  }
}
</style> 