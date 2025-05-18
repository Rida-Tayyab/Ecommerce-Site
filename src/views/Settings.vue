<template>
  <div class="settings-container">
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <h2>Settings</h2>
        </div>
      </template>

      <el-form :model="settings" label-width="200px" class="settings-form">
        <!-- Store Settings -->
        <h3>Store Settings</h3>
        <el-form-item label="Store Name">
          <el-input v-model="settings.storeName" placeholder="Enter store name" />
        </el-form-item>
        <el-form-item label="Store Email">
          <el-input v-model="settings.storeEmail" placeholder="Enter store email" />
        </el-form-item>
        <el-form-item label="Store Phone">
          <el-input v-model="settings.storePhone" placeholder="Enter store phone" />
        </el-form-item>

        <!-- Notification Settings -->
        <h3>Notification Settings</h3>
        <el-form-item label="Low Stock Alerts">
          <el-switch v-model="settings.lowStockAlerts" />
        </el-form-item>
        <el-form-item label="Email Notifications">
          <el-switch v-model="settings.emailNotifications" />
        </el-form-item>
        <el-form-item label="Notification Email">
          <el-input 
            v-model="settings.notificationEmail" 
            placeholder="Enter notification email"
            :disabled="!settings.emailNotifications"
          />
        </el-form-item>

        <!-- Display Settings -->
        <h3>Display Settings</h3>
        <el-form-item label="Currency">
          <el-select v-model="settings.currency" placeholder="Select currency">
            <el-option label="USD ($)" value="USD" />
            <el-option label="EUR (€)" value="EUR" />
            <el-option label="GBP (£)" value="GBP" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date Format">
          <el-select v-model="settings.dateFormat" placeholder="Select date format">
            <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
            <el-option label="DD/MM/YYYY" value="DD/MM/YYYY" />
            <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
          </el-select>
        </el-form-item>

        <!-- Save Button -->
        <el-form-item>
          <el-button type="primary" @click="saveSettings">Save Settings</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const settings = ref({
  // Store Settings
  storeName: 'Forsit E-commerce',
  storeEmail: 'admin@forsit.com',
  storePhone: '+1 234 567 8900',

  // Notification Settings
  lowStockAlerts: true,
  emailNotifications: true,
  notificationEmail: 'notifications@forsit.com',

  // Display Settings
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY'
})

const saveSettings = () => {
  // Here you would typically save the settings to your backend
  ElMessage({
    message: 'Settings saved successfully',
    type: 'success'
  })
}
</script>

<style lang="scss" scoped>
.settings-container {
  padding: 24px;
  background-color: var(--background-secondary, #f3f4f6);
  min-height: calc(100vh - 60px);

  .settings-card {
    background-color: var(--background-primary, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    box-shadow: var(--card-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1));

    .card-header {
      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: var(--text-primary, #1f2937);
      }
    }

    .settings-form {
      h3 {
        margin: 24px 0 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color, #e5e7eb);
        color: var(--text-primary, #1f2937);
        font-size: 16px;
        font-weight: 600;

        &:first-child {
          margin-top: 0;
        }
      }

      :deep(.el-form-item__label) {
        font-weight: 500;
        color: var(--text-regular, #4b5563);
      }

      :deep(.el-input),
      :deep(.el-select) {
        width: 100%;
        max-width: 400px;
      }
    }
  }
}

// Dark theme styles
[data-theme="dark"] {
  .settings-container {
    background-color: #1f2937;

    .settings-card {
      background-color: #374151;
      border-color: #4b5563;

      .card-header h2 {
        color: #f3f4f6;
      }

      .settings-form {
        h3 {
          color: #f3f4f6;
          border-bottom-color: #4b5563;
        }

        :deep(.el-form-item__label) {
          color: #d1d5db;
        }
      }
    }
  }
}
</style> 