<template>
  <div class="inventory-container">
    <el-card class="inventory-card">
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h2 class="page-title">Inventory Management</h2>
            <el-tag type="info" class="inventory-count">
              {{ filteredInventory.length }} Products
            </el-tag>
          </div>
          <div class="header-actions">
            <el-button type="primary" class="add-product-btn" @click="showAddProductDialog">
              <el-icon><Plus /></el-icon>
              Add New Product
            </el-button>
          </div>
        </div>
      </template>

      <div class="filters-container">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-input
              v-model="searchQuery"
              placeholder="Search products..."
              clearable
              class="search-input"
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="selectedCategory"
              placeholder="Filter by category"
              clearable
              class="category-select"
              @change="handleCategoryChange"
            >
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-switch
              v-model="showLowStock"
              active-text="Show Low Stock Only"
              class="stock-switch"
              @change="handleLowStockChange"
            />
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="filteredInventory"
        style="width: 100%"
        border
        stripe
        highlight-current-row
      >
        <el-table-column prop="name" label="Product Name" sortable />
        <el-table-column prop="category" label="Category" sortable />
        <el-table-column prop="price" label="Price" sortable>
          <template #default="{ row }">
            ${{ row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="Current Stock" sortable>
          <template #default="{ row }">
            <span :class="{ 'low-stock': row.stock <= row.lowStockThreshold }">
              {{ row.stock }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="lowStockThreshold" label="Low Stock Alert" sortable />
        <el-table-column prop="lastRestocked" label="Last Restocked" sortable />
        <el-table-column label="Actions" width="150">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="showUpdateStockDialog(row)"
            >
              Update Stock
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Add Product Dialog -->
    <el-dialog
      v-model="addProductDialogVisible"
      title="Add New Product"
      width="50%"
      class="product-dialog"
    >
      <el-form :model="newProduct" label-width="140px" class="product-form">
        <el-form-item label="Product Name" required>
          <el-input v-model="newProduct.name" placeholder="Enter product name" />
        </el-form-item>
        <el-form-item label="Category" required>
          <el-select v-model="newProduct.category" placeholder="Select category" class="w-100">
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Price" required>
          <el-input-number 
            v-model="newProduct.price" 
            :min="0" 
            :precision="2" 
            :step="0.01"
            class="w-100"
          />
        </el-form-item>
        <el-form-item label="Initial Stock" required>
          <el-input-number 
            v-model="newProduct.stock" 
            :min="0" 
            class="w-100"
          />
        </el-form-item>
        <el-form-item label="Low Stock Alert" required>
          <el-input-number 
            v-model="newProduct.lowStockThreshold" 
            :min="0" 
            class="w-100"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addProductDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleAddProduct">
            Add Product
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- Update Stock Dialog -->
    <el-dialog
      v-model="updateStockDialogVisible"
      title="Update Stock"
      width="30%"
    >
      <el-form :model="stockUpdate" label-width="120px">
        <el-form-item label="Current Stock">
          <span>{{ selectedProduct?.stock || 0 }}</span>
        </el-form-item>
        <el-form-item label="New Stock" required>
          <el-input-number
            v-model="stockUpdate.newStock"
            :min="0"
            class="w-100"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateStockDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleUpdateStock">
            Update
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Plus, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const store = useStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const showLowStock = ref(false)
const addProductDialogVisible = ref(false)
const updateStockDialogVisible = ref(false)
const selectedProduct = ref(null)

const newProduct = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  lowStockThreshold: 10
})

const stockUpdate = ref({
  newStock: 0
})

const categories = computed(() => store.getters['inventory/categories'])
const filteredInventory = computed(() => store.getters['inventory/filteredInventory'])

const handleSearch = () => {
  store.dispatch('inventory/setFilter', { filter: 'search', value: searchQuery.value })
}

const handleCategoryChange = () => {
  store.dispatch('inventory/setFilter', { filter: 'category', value: selectedCategory.value })
}

const handleLowStockChange = () => {
  store.dispatch('inventory/setFilter', { filter: 'lowStock', value: showLowStock.value })
}

const showAddProductDialog = () => {
  addProductDialogVisible.value = true
}

const handleAddProduct = () => {
  if (!newProduct.value.name || !newProduct.value.category) {
    ElMessage.error('Please fill in all required fields')
    return
  }

  store.dispatch('inventory/addProduct', {
    ...newProduct.value,
    lastRestocked: new Date().toISOString().split('T')[0]
  })
  
  addProductDialogVisible.value = false
  newProduct.value = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    lowStockThreshold: 10
  }
  
  ElMessage.success('Product added successfully')
}

const showUpdateStockDialog = (product) => {
  selectedProduct.value = product
  stockUpdate.value.newStock = product.stock
  updateStockDialogVisible.value = true
}

const handleUpdateStock = () => {
  if (!selectedProduct.value) return

  store.dispatch('inventory/updateStock', {
    id: selectedProduct.value.id,
    newStock: stockUpdate.value.newStock
  })

  updateStockDialogVisible.value = false
  selectedProduct.value = null
  ElMessage.success('Stock updated successfully')
}
</script>

<style lang="scss" scoped>
.inventory-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);

  .inventory-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;

        .page-title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #303133;
        }

        .inventory-count {
          font-size: 14px;
        }
      }
    }

    .filters-container {
      margin-bottom: 24px;

      .search-input,
      .category-select {
        width: 100%;
      }

      .stock-switch {
        margin-top: 8px;
      }
    }
  }

  .product-dialog {
    .product-form {
      .w-100 {
        width: 100%;
      }
    }
  }

  :deep(.low-stock) {
    color: #F56C6C;
    font-weight: 600;
  }
}
</style> 