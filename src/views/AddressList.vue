<template>
  <div class="address-list">
    <nav-bar title="地址列表"></nav-bar>

    <van-address-list
      class="van-address-list"
      v-model="chosenAddressId"
      :list="list.list"
      default-tag-text="默认"
      @click-item="selectDefault"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onActivated, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useAddressStore } from '@/store/Address'

const router = useRouter()
const addressStore = useAddressStore()

let chosenAddressId = ref('1')

let list: any = reactive({ list: [] })
onActivated(async () => {
  await addressStore.updateAddressInfo()
  list.list = addressStore.addressList.map((item) => ({
    id: item.id,
    name: item.name,
    tel: item.tel,
    address: item.province + item.city + item.county + item.addressDetail,
    isDefault: item.isDefault === 'true' ? true : false
  }))
})
function selectDefault(item: any) {
  console.log('set', item)
  addressStore.setCartAddress(item)
  router.back()
}

function onAdd() {
  router.push('/address/add')
}

function onEdit(item: any) {
  addressStore.setCurrentAddress(item.id)
  router.push('/address/edit')
}
</script>

<style scoped lang="less">
.address-list {
  height: 100%;

  .van-address-list {
    height: calc(100% - 80px);
  }
}
</style>
