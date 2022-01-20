<template>
  <div class="cart">
    <nav-bar title="购物车" />

    <main class="content">
      <!-- // 默认收货地址 -->
      <default-address :default-address="defaultAddressInfo"></default-address>

      <!-- // 订单列表 -->
      <div class="order-list">
        <order-list-item></order-list-item>
        <order-list-item></order-list-item>
      </div>
    </main>

    <!-- // 提交订单栏 -->
    <van-submit-bar
      class="submitbar"
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import DefaultAddress from './Cart/DefaultAddress.vue'
import OrderListItem from './Cart/OrderListItem.vue'

export default defineComponent({
  components: {
    NavBar,
    DefaultAddress,
    OrderListItem
  },
  name: 'Cart',
  setup() {
    // 默认收货地址
    const defaultAddressInfo = {
      name: '李子航',
      tel: 15630652656,
      address: '浙江省杭州市西湖区文三路138号东方通信大厦7楼501室'
    }
    // 提交订单栏--提交按钮事件
    function onSubmit() {
      console.log('提交事件触发')
    }

    // 提交订单栏--合计金额
    const totalPrice = ref(0)

    // 提交订单栏--全选checkbox
    const checked = ref(false)

    return {
      defaultAddressInfo,
      onSubmit,
      totalPrice,
      checked
    }
  }
})
</script>

<style scoped lang="less">
.cart {
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    height: calc(100% - 80px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 30px 20px;

    .order-list {
      width: 100%;
      height: 100%;
      margin-top: 30px;
    }
  }

  .submitbar {
    position: static;
  }
}
</style>
