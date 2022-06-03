<template>
  <div class="address-edit">
    <nav-bar title="地址编辑"></nav-bar>

    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      :show-delete="showDelete"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import { onActivated, ref, onDeactivated } from 'vue'
import { areaList } from '@vant/area-data'
import NavBar from '@/components/NavBar.vue'
import { useAddressStore } from '@/store/Address'
import { useRoute, useRouter } from 'vue-router'

const addressStore = useAddressStore()
const route = useRoute()
const router = useRouter()
const showDelete = ref(true)
const addressInfo: any = ref({})

onActivated(() => {
  if (route.params.method === 'edit') {
    showDelete.value = true
    const currentAddress = addressStore.currentAddress
    if (Object.keys(currentAddress).length > 0)
      addressInfo.value = currentAddress
    const isDefault = addressInfo.value.isDefault
    addressInfo.value.isDefault = isDefault === 'true' ? true : false
    return
  }
  showDelete.value = false
})

onDeactivated(() => {
  addressInfo.value = {}
  addressStore.clearCurrentAddress()
})

function onSave(info: any) {
  const method = route.params.method
  if (method === 'edit') {
    info.isDefault = String(info.isDefault)
    addressStore.editAddress(info)
  } else if (method === 'add') {
    info.isDefault = String(info.isDefault)
    addressStore.addToAddressList(info)
  } else {
    return
  }
  router.back()
}

function onDelete(info: any) {
  addressStore.deleteAddress(info.id)
  router.back()
}
</script>

<style scoped lang="less">
.address-edit {
  height: 100%;
}
</style>
