import localCache from '@/utils/localCache'
import { defineStore } from 'pinia'
import { UserStateType } from './types'
import { useCartStore } from './Cart'

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userInfo: {}
    } as UserStateType),
  actions: {
    updateUserInfo(res: any) {
      const cartStore = useCartStore()

      const { userInfo, cartInfo } = res
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      cartStore.updateCartInfo(cartInfo)
    },
    resetLoginInfo() {
      const cartStore = useCartStore()
      this.userInfo = localCache.getCache('userInfo') || []
      cartStore.cartList = localCache.getCache('cartInfo') || []
    }
  }
})
