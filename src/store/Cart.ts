import { defineStore } from 'pinia'
import { CartStateType } from './types'
import { addShopToCart } from '@/api/shop'
import localCache from '@/utils/localCache'

export const useCartStore = defineStore('cart', {
  state: () =>
    ({
      cartList: []
    } as CartStateType),
  getters: {
    totalPrice(state) {
      let price = 0
      state.cartList.forEach((item) => (price += item.count * item.price))
      return price * 100
    }
  },
  actions: {
    updateCartInfo(cartInfo: any) {
      this.cartList = cartInfo
      localCache.setCache('cartInfo', cartInfo)
    },
    addToCart(cart: any) {
      const findCart = this.cartList.find((item: any) => item.id === cart.id)
      if (findCart == undefined) {
        this.cartList.push(cart)
        addShopToCart(cart)
      } else {
        findCart.count += cart.count
        addShopToCart(findCart)
      }
      localCache.setCache('cart', this.cartList)
    },
    findCartById(id: number) {
      if (this.cartList.length === 0) return
      return this.cartList.find((item) => item.id === id)
    },
    addCount(id: number) {
      const item = this.findCartById(id)
      if (item) item.count++
    },
    reduceCount(id: number) {
      const item = this.findCartById(id)
      if (item && item.count > 1) item.count--
    },
    changeChecked(id: number) {
      const item = this.findCartById(id)
      if (item) item.isChecked = !item.isChecked
    },
    checkAll(status: boolean) {
      this.cartList.forEach((item) => (item.isChecked = status))
    }
  }
})
