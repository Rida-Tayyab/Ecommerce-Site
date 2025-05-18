<template>
  <div class="profile-container">
    <el-row :gutter="24">
      <!-- Profile Overview Card -->
      <el-col :span="8">
        <el-card class="profile-card">
          <div class="profile-header">
            <el-avatar :size="100" :src="userProfile.avatar" />
            <h2 class="user-name">{{ userProfile.name }}</h2>
            <p class="user-role">{{ userProfile.role }}</p>
          </div>
          <el-divider />
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-value">{{ userProfile.lastLogin }}</span>
              <span class="stat-label">Last Login</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userProfile.accountAge }}</span>
              <span class="stat-label">Account Age</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- Settings Cards -->
      <el-col :span="16">
        <el-card class="settings-card">
          <template #header>
            <div class="card-header">
              <h3>Account Settings</h3>
            </div>
          </template>

          <el-tabs v-model="activeTab" class="settings-tabs">
            <!-- Personal Information -->
            <el-tab-pane label="Personal Information" name="personal">
              <el-form :model="userProfile" label-width="140px" class="settings-form">
                <el-form-item label="Full Name">
                  <el-input v-model="userProfile.name" />
                </el-form-item>
                <el-form-item label="Email">
                  <el-input v-model="userProfile.email" />
                </el-form-item>
                <el-form-item label="Phone">
                  <el-input v-model="userProfile.phone" />
                </el-form-item>
                <el-form-item label="Profile Picture">
                  <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="userProfile.avatar" :src="userProfile.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- Security Settings -->
            <el-tab-pane label="Security" name="security">
              <el-form label-width="140px" class="settings-form">
                <el-form-item label="Current Password">
                  <el-input v-model="security.currentPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="New Password">
                  <el-input v-model="security.newPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="Confirm Password">
                  <el-input v-model="security.confirmPassword" type="password" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updatePassword">Update Password</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- Preferences -->
            <el-tab-pane label="Preferences" name="preferences">
              <el-form label-width="140px" class="settings-form">
                <el-form-item label="Email Notifications">
                  <el-switch v-model="preferences.emailNotifications" />
                </el-form-item>
                <el-form-item label="Low Stock Alerts">
                  <el-switch v-model="preferences.lowStockAlerts" />
                </el-form-item>
                <el-form-item label="Theme">
                  <el-select v-model="preferences.theme" class="w-100">
                    <el-option label="Light" value="light" />
                    <el-option label="Dark" value="dark" />
                    <el-option label="System" value="system" />
                  </el-select>
                </el-form-item>
                <el-form-item label="Language">
                  <el-select v-model="preferences.language" class="w-100">
                    <el-option label="English" value="en" />
                    <el-option label="Spanish" value="es" />
                    <el-option label="French" value="fr" />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <div class="form-actions">
            <el-button type="primary" @click="saveSettings">Save Changes</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('personal')

// Mock user profile data
const userProfile = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  role: 'Administrator',
  avatar: '',
  lastLogin: '2 hours ago',
  accountAge: '2 years'
})

// Security settings
const security = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// User preferences
const preferences = reactive({
  emailNotifications: true,
  lowStockAlerts: true,
  theme: 'light',
  language: 'en'
})

// Methods
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  // Create a URL for the uploaded image
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    userProfile.avatar = reader.result
  }
  return false // Prevent auto upload
}

const updatePassword = () => {
  if (security.newPassword !== security.confirmPassword) {
    ElMessage.error('New passwords do not match!')
    return
  }
  // Add password update logic here
  ElMessage.success('Password updated successfully')
}

const saveSettings = () => {
  // Add save settings logic here
  ElMessage.success('Settings saved successfully')
}

const resetForm = () => {
  // Add reset form logic here
  ElMessage.info('Form reset')
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);

  .profile-card {
    .profile-header {
      text-align: center;
      padding: 20px 0;

      .user-name {
        margin: 16px 0 8px;
        font-size: 24px;
        font-weight: 600;
        color: #303133;
      }

      .user-role {
        margin: 0;
        color: #909399;
        font-size: 14px;
      }
    }

    .profile-stats {
      display: flex;
      justify-content: space-around;
      padding: 16px 0;

      .stat-item {
        text-align: center;

        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }

  .settings-card {
    .card-header {
      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }

    .settings-tabs {
      :deep(.el-tabs__nav-wrap::after) {
        height: 1px;
      }

      :deep(.el-tabs__item) {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
    }

    .settings-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px 0;

      .w-100 {
        width: 100%;
      }

      :deep(.el-form-item__label) {
        font-weight: 500;
      }
    }

    .avatar-uploader {
      :deep(.el-upload) {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);

        &:hover {
          border-color: var(--el-color-primary);
        }
      }

      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
      }

      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #ebeef5;
  }
}
</style> 