// Sample products data
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    lowStockThreshold: 10,
    lastRestocked: '2024-03-15'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    category: 'Electronics',
    price: 149.99,
    stock: 28,
    lowStockThreshold: 15,
    lastRestocked: '2024-03-10'
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 29.99,
    stock: 8,
    lowStockThreshold: 20,
    lastRestocked: '2024-03-05'
  },
  {
    id: 4,
    name: 'Professional Blender',
    category: 'Home & Kitchen',
    price: 89.99,
    stock: 15,
    lowStockThreshold: 5,
    lastRestocked: '2024-03-12'
  },
  {
    id: 5,
    name: 'Designer Backpack',
    category: 'Accessories',
    price: 79.99,
    stock: 12,
    lowStockThreshold: 8,
    lastRestocked: '2024-03-08'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    category: 'Electronics',
    price: 39.99,
    stock: 25,
    lowStockThreshold: 10,
    lastRestocked: '2024-03-14'
  },
  {
    id: 7,
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Kitchen',
    price: 24.99,
    stock: 35,
    lowStockThreshold: 15,
    lastRestocked: '2024-03-11'
  },
  {
    id: 8,
    name: 'Smart LED Light Bulb',
    category: 'Electronics',
    price: 19.99,
    stock: 5,
    lowStockThreshold: 10,
    lastRestocked: '2024-03-09'
  }
]

export default {
  namespaced: true,
  
  state: {
    products: [...sampleProducts],
    filters: {
      search: '',
      category: '',
      lowStock: false
    }
  },

  getters: {
    categories: (state) => {
      const categories = new Set(state.products.map(product => product.category))
      return Array.from(categories)
    },

    filteredInventory: (state) => {
      let filtered = [...state.products]

      // Apply search filter
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        )
      }

      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(product => 
          product.category === state.filters.category
        )
      }

      // Apply low stock filter
      if (state.filters.lowStock) {
        filtered = filtered.filter(product => 
          product.stock <= product.lowStockThreshold
        )
      }

      return filtered
    }
  },

  mutations: {
    SET_FILTER(state, { filter, value }) {
      state.filters[filter] = value
    },

    ADD_PRODUCT(state, product) {
      const newId = Math.max(...state.products.map(p => p.id)) + 1
      state.products.push({
        ...product,
        id: newId
      })
    },

    UPDATE_STOCK(state, { id, newStock }) {
      const product = state.products.find(p => p.id === id)
      if (product) {
        product.stock = newStock
        product.lastRestocked = new Date().toISOString().split('T')[0]
      }
    }
  },

  actions: {
    setFilter({ commit }, payload) {
      commit('SET_FILTER', payload)
    },

    addProduct({ commit }, product) {
      commit('ADD_PRODUCT', product)
    },

    updateStock({ commit }, payload) {
      commit('UPDATE_STOCK', payload)
    }
  }
} 