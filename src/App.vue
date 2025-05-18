<template>
  <div class="app-container">
    <el-container>
      <el-aside width="250px">
        <div class="logo">
          <h1>Forsit Admin</h1>
        </div>
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/dashboard">
            <el-icon><DataLine /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/revenue">
            <el-icon><Money /></el-icon>
            <span>Revenue Analysis</span>
          </el-menu-item>
          <el-menu-item index="/inventory">
            <el-icon><Box /></el-icon>
            <span>Inventory</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <el-icon><Goods /></el-icon>
            <span>Products</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-content">
            <h2>{{ currentPageTitle }}</h2>
            <el-dropdown>
              <span class="user-profile">
                Admin User
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/profile')">
                    <el-icon><User /></el-icon>
                    Profile
                  </el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/settings')">
                    <el-icon><Setting /></el-icon>
                    Settings
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">
                    <el-icon><SwitchButton /></el-icon>
                    Logout
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataLine, Money, Box, Goods, ArrowDown, User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()

const currentPageTitle = computed(() => {
  const path = route.path
  switch (path) {
    case '/dashboard':
      return 'Dashboard'
    case '/revenue':
      return 'Revenue Analysis'
    case '/inventory':
      return 'Inventory Management'
    case '/products':
      return 'Product Management'
    case '/profile':
      return 'User Profile'
    case '/settings':
      return 'Settings'
    default:
      return 'Dashboard'
  }
})

const handleLogout = () => {
  ElMessageBox.confirm(
    'Are you sure you want to logout?',
    'Logout Confirmation',
    {
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    // Add your logout logic here
    router.push('/login')
  }).catch(() => {})
}
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  
  .el-container {
    height: 100%;
  }

  .el-aside {
    background-color: #fff !important;
    color: #4f46e5 !important;

    .logo {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ede9fe;

      h1 {
        color: #311954;
        font-size: 20px;
        margin: 0;
        font-weight: bold;
      }
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 20px;

    .header-content {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        margin: 0;
        font-size: 18px;
        color: #311954;
      }

      .user-profile {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #311954;

        .el-icon {
          margin-left: 5px;
        }
      }
    }
  }

  .el-main {
    background-color: #f3f4f6;
    padding: 20px;
  }
}

.el-menu-vertical {
  .el-menu-item.is-active {
    background-color: #ede9fe !important;
    color: #311954 !important;
    font-weight: bold;
    
    svg, .el-icon {
      color: #311954 !important;
    }
  }
  .el-menu-item:hover {
    color: #311954 !important;
    
    svg, .el-icon {
      color: #311954 !important;
    }
  }
}
</style> 