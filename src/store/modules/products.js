export default {
  namespaced: true,
  state: {
    categories: [
      'Electronics',
      'Clothing',
      'Home',
      'Books',
      'Sports'
    ],
    imageUploadProgress: 0,
    newProduct: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      images: []
    }
  },
  mutations: {
    SET_NEW_PRODUCT(state, product) {
      state.newProduct = { ...product }
    },
    UPDATE_NEW_PRODUCT_FIELD(state, { field, value }) {
      state.newProduct[field] = value
    },
    ADD_PRODUCT_IMAGE(state, image) {
      state.newProduct.images.push(image)
    },
    REMOVE_PRODUCT_IMAGE(state, index) {
      state.newProduct.images.splice(index, 1)
    },
    SET_UPLOAD_PROGRESS(state, progress) {
      state.imageUploadProgress = progress
    },
    RESET_NEW_PRODUCT(state) {
      state.newProduct = {
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        images: []
      }
      state.imageUploadProgress = 0
    }
  },
  actions: {
    updateNewProduct({ commit }, payload) {
      commit('UPDATE_NEW_PRODUCT_FIELD', payload)
    },
    addProductImage({ commit }, image) {
      commit('ADD_PRODUCT_IMAGE', image)
    },
    removeProductImage({ commit }, index) {
      commit('REMOVE_PRODUCT_IMAGE', index)
    },
    async uploadImage({ commit }, file) {
      // Simulate image upload
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        commit('SET_UPLOAD_PROGRESS', i)
      }
      return URL.createObjectURL(file)
    },
    resetNewProduct({ commit }) {
      commit('RESET_NEW_PRODUCT')
    }
  },
  getters: {
    getNewProduct: state => state.newProduct,
    getImageUploadProgress: state => state.imageUploadProgress,
    getCategories: state => state.categories
  }
} 