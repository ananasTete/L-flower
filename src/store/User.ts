import localCache from '@/utils/localCache'
import { defineStore } from 'pinia'
import { UserStateType } from './types'

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      userInfo: {}
    } as UserStateType),
  actions: {
    updateUserInfo(user: any) {
      this.userInfo = user
      localCache.setCache('user', user)
      localCache.setCache('token', user.token)
    }
  }
})
