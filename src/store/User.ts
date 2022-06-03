import localCache from '@/utils/localCache'
import { defineStore } from 'pinia'
import { UserStateType } from './types'
import { useCartStore } from './Cart'
import { useAddressStore } from './Address'

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userInfo: {}
    } as UserStateType),
  actions: {
    updateUserInfo(res: any) {
      const cartStore = useCartStore()
      const addressStore = useAddressStore()

      const { userInfo, cartInfo, addressInfo } = res
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      cartStore.updateCartInfo(cartInfo)
      addressStore.updateAddressInfo()
    },
    resetLoginInfo() {
      const cartStore = useCartStore()
      const addressStore = useAddressStore()
      this.userInfo = localCache.getCache('userInfo') || []
      cartStore.cartList = localCache.getCache('cartInfo') || []
      addressStore.addressList = localCache.getCache('addressInfo') || []
      addressStore.currentAddress =
        localCache.getCache('currentEditAddress') || null
      addressStore.cartAddress = localCache.getCache('cartAddress')
    }
  }
})
