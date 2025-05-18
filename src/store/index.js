import { createStore } from 'vuex'
import revenue from './modules/revenue'
import inventory from './modules/inventory'
import products from './modules/products'

export default createStore({
  modules: {
    revenue,
    inventory,
    products
  }
}) 