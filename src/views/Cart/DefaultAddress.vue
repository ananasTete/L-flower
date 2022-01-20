<template>
  <div class="container">
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
    <div class="chooseAddress" @click="onChooseAddress">
      <van-icon name="arrow" color="gray" size="30" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
    // 选择收货地址
    function onChooseAddress() {
      console.log('选择收货地址事件')
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
