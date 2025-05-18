<template>
  <div class="products-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>Product Registration</h3>
        </div>
      </template>

      <el-form
        ref="productForm"
        :model="newProduct"
        :rules="rules"
        label-width="120px"
        class="product-form"
      >
        <el-form-item label="Product Name" prop="name">
          <el-input v-model="newProduct.name" placeholder="Enter product name" />
        </el-form-item>

        <el-form-item label="Category" prop="category">
          <el-select v-model="newProduct.category" placeholder="Select category">
            <el-option
              v-for="category in categories"
              :key="category"
              :label="category"
              :value="category"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="newProduct.description"
            type="textarea"
            :rows="4"
            placeholder="Enter product description"
          />
        </el-form-item>

        <el-form-item label="Price" prop="price">
          <el-input-number
            v-model="newProduct.price"
            :min="0"
            :precision="2"
            :step="0.01"
            placeholder="Enter price"
          />
        </el-form-item>

        <el-form-item label="Initial Stock" prop="stock">
          <el-input-number
            v-model="newProduct.stock"
            :min="0"
            :step="1"
            placeholder="Enter initial stock"
          />
        </el-form-item>

        <el-form-item label="Low Stock Alert" prop="lowStockThreshold">
          <el-input-number
            v-model="newProduct.lowStockThreshold"
            :min="0"
            :step="1"
            placeholder="Enter low stock threshold"
          />
        </el-form-item>

        <el-form-item label="Product Images" prop="images">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            :limit="5"
            multiple
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">
            Upload up to 5 images. Supported formats: JPG, PNG, GIF
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">Register Product</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const store = useStore()
const productForm = ref(null)
const fileList = ref([])

const newProduct = ref({
  name: '',
  category: '',
  description: '',
  price: 0,
  stock: 0,
  lowStockThreshold: 10,
  images: []
})

const categories = computed(() => store.getters['products/getCategories'])

const rules = {
  name: [
    { required: true, message: 'Please enter product name', trigger: 'blur' },
    { min: 3, max: 50, message: 'Length should be 3 to 50 characters', trigger: 'blur' }
  ],
  category: [
    { required: true, message: 'Please select a category', trigger: 'change' }
  ],
  description: [
    { required: true, message: 'Please enter product description', trigger: 'blur' },
    { min: 10, max: 500, message: 'Length should be 10 to 500 characters', trigger: 'blur' }
  ],
  price: [
    { required: true, message: 'Please enter product price', trigger: 'blur' },
    { type: 'number', min: 0, message: 'Price must be greater than 0', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: 'Please enter initial stock', trigger: 'blur' },
    { type: 'number', min: 0, message: 'Stock must be greater than or equal to 0', trigger: 'blur' }
  ],
  lowStockThreshold: [
    { required: true, message: 'Please enter low stock threshold', trigger: 'blur' },
    { type: 'number', min: 0, message: 'Threshold must be greater than or equal to 0', trigger: 'blur' }
  ]
}

const handleFileChange = async (file) => {
  try {
    const imageUrl = await store.dispatch('products/uploadImage', file.raw)
    newProduct.value.images.push(imageUrl)
  } catch (error) {
    ElMessage.error('Failed to upload image')
  }
}

const handleFileRemove = (file) => {
  const index = newProduct.value.images.indexOf(file.url)
  if (index !== -1) {
    newProduct.value.images.splice(index, 1)
  }
}

const submitForm = async () => {
  if (!productForm.value) return

  await productForm.value.validate(async (valid) => {
    if (valid) {
      try {
        await store.dispatch('inventory/addProduct', {
          ...newProduct.value,
          lastRestocked: new Date().toISOString().split('T')[0]
        })
        ElMessage.success('Product registered successfully')
        resetForm()
      } catch (error) {
        ElMessage.error('Failed to register product')
      }
    }
  })
}

const resetForm = () => {
  if (productForm.value) {
    productForm.value.resetFields()
  }
  fileList.value = []
  newProduct.value = {
    name: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    lowStockThreshold: 10,
    images: []
  }
}
</script>

<style lang="scss" scoped>
.products-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
    }
  }

  .product-form {
    max-width: 800px;
    margin: 0 auto;
  }

  .upload-tip {
    font-size: 12px;
    color: #909399;
    margin-top: 8px;
  }

  :deep(.el-upload--picture-card) {
    width: 120px;
    height: 120px;
    line-height: 120px;
  }

  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 120px;
    height: 120px;
  }
}
</style> 