import localCache from '@/utils/localCache'
import { defineStore } from 'pinia'
import { AddressStateType } from './types'
import {
  uploadAddress,
  getAddressListById,
  editAddressListById,
  deleteAddressById
} from '@/api/shop'
import { useUserStore } from './User'

export const useAddressStore = defineStore('address', {
  state: () =>
    ({
      addressList: [],
      currentAddress: {},
      cartAddress: {}
    } as AddressStateType),
  getters: {
    userId: () => useUserStore()?.userInfo?.id
  },
  actions: {
    // 更新用户信息
    async updateAddressInfo() {
      const newAddressList: any = await getAddressListById(this.userId)
      this.addressList = newAddressList
      this.cartAddress =
        this.addressList.find((item) => item.isDefault === 'true') || {}
      localCache.setCache('addressInfo', this.addressList)
      localCache.setCache('cartAddress', this.cartAddress)
    },
    // 新建
    async addToAddressList(address: any) {
      const res: any = await uploadAddress(address)
    },
    // 编辑
    async editAddress(address: any) {
      const id = address.id
      const index = this.addressList.findIndex((item) => item.id === id)
      if (index > -1) {
        this.addressList[index] = address
        localCache.setCache('addressInfo', this.addressList)
        await editAddressListById(this.addressList[index])
      }
    },
    // 删除
    async deleteAddress(id: number) {
      // const index = this.addressList.findIndex((item) => item.id === id)
      // delete this.addressList[index]
      // localCache.setCache('addressInfo', this.addressList)
      await deleteAddressById(id)
    },
    // 设置当前编辑地址
    setCurrentAddress(id: number) {
      const item = this.addressList.find((item) => item.id === id)
      if (item) {
        this.currentAddress = item
        localCache.setCache('currentEditAddress', this.currentAddress)
      }
    },
    setCartAddress(info: any) {
      this.cartAddress = info
      localCache.setCache('cartAddress', this.cartAddress)
    },
    // 清除当前编辑地址
    clearCurrentAddress() {
      this.currentAddress = null
    }
  }
})
