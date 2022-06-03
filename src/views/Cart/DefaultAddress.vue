<template>
  <div class="container" @click="onChooseAddress">
    <div class="info">
      <span class="name info-child">{{ defaultAddress.name }}</span>
      <span class="tel info-child">{{ defaultAddress.tel }}</span>
      <van-button
        class="info-child"
        disabled
        type="primary"
        round
        size="mini"
        color="red"
        >默认</van-button
      >
    </div>
    <div class="address">{{ defaultAddress.address }}</div>
    <div class="chooseAddress">
      <van-icon name="arrow" color="gray" size="30" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { DefaultAddressType } from './types'

export default defineComponent({
  name: '',
  props: {
    defaultAddress: {
      type: Object as PropType<DefaultAddressType>,
      required: true
    }
  },
  setup() {
    const router = useRouter()

    // 选择收货地址
    function onChooseAddress() {
      router.push('/address-list')
    }

    return {
      onChooseAddress
    }
  }
})
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 200px;
  background: #fadbd8;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 90% 10%;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;

  .info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .info-child {
      font-size: 36px;
      margin-left: 15px;
    }
  }
  .address {
    padding: 0 15px;
    font-size: 30px;
    line-height: 40px;
  }

  .chooseAddress {
    grid-row-start: 1;
    grid-row-end: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
