import { defineStore } from 'pinia'
import { CartStateType } from './types'
import { updateShopToCart } from '@/api/shop'
import localCache from '@/utils/localCache'

export const useCartStore = defineStore('cart', {
  state: () =>
    ({
      cartList: []
    } as CartStateType),
  getters: {
    totalPrice(state) {
      let price = 0
      state.cartList.forEach((item) => {
        if (item.isChecked) {
          price += item.count * item.price
        }
      })
      return price * 100
    }
  },
  actions: {
    updateCartInfo(cartInfo: any) {
      this.cartList = cartInfo
      localCache.setCache('cartInfo', cartInfo)
    },
    findCartById(id: number) {
      return this.cartList.find((item) => item.shopId === id)
    },
    addToCart(cart: any) {
      const findCart = this.findCartById(cart.shopId)
      if (findCart == undefined) {
        this.cartList.push(cart)
        updateShopToCart(cart)
      } else {
        findCart.count += cart.count
        updateShopToCart(findCart)
      }
      localCache.setCache('cartInfo', this.cartList)
    },
    addCount(id: number) {
      const item = this.findCartById(id)
      if (item) {
        item.count++
        localCache.setCache('cartInfo', this.cartList)
        updateShopToCart(item)
      }
    },
    reduceCount(id: number) {
      const item = this.findCartById(id)
      if (item && item.count > 1) {
        item.count--
        localCache.setCache('cartInfo', this.cartList)
        updateShopToCart(item)
      }
    },
    changeChecked(id: number) {
      const item = this.findCartById(id)
      if (item) item.isChecked = !item.isChecked
      localCache.setCache('cartInfo', this.cartList)
    },
    checkAll(status: boolean) {
      this.cartList.forEach((item) => (item.isChecked = status))
      localCache.setCache('cartInfo', this.cartList)
    }
  }
})
