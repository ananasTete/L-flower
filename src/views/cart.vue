<template>
  <div class="cart">
    <nav-bar :showLeft="false" title="购物车" />

    <main class="content">
      <!-- // 默认收货地址 -->
      <van-config-provider v-if="showDefault" :theme-vars="themeVars">
        <van-contact-card
          add-text="添加收货地址"
          type="add"
          @click="onAddAddress"
        />
      </van-config-provider>

      <default-address
        v-else
        :default-address="defaultAddressInfo.info"
      ></default-address>

      <!-- // 订单列表 -->
      <div class="order-list">
        <template v-for="item in cartStore.cartList" :key="item.id">
          <order-list-item :cartItem="item"></order-list-item>
        </template>
      </div>
    </main>

    <!-- // 提交订单栏 -->
    <van-submit-bar
      class="submitbar"
      :price="cartStore.totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="onAllChecked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated, reactive } from 'vue'
import NavBar from '@/components/NavBar.vue'
import DefaultAddress from './Cart/DefaultAddress.vue'
import OrderListItem from './Cart/OrderListItem.vue'
import { useCartStore } from '@/store/Cart'
import { useAddressStore } from '@/store/Address'
import { useRouter } from 'vue-router'
import { pay } from '@/api/order'

export default defineComponent({
  components: {
    NavBar,
    DefaultAddress,
    OrderListItem
  },
  name: 'Cart',
  setup() {
    const cartStore = useCartStore()
    const addressStore = useAddressStore()
    const router = useRouter()

    const themeVars = {
      contactCardAddIconColor: 'red'
    }

    let defaultAddressInfo: any = reactive({ info: {} })
    const showDefault = ref(false)

    // 默认收货地址
    // const item = addressStore.cartAddress

    onActivated(() => {
      const item = addressStore.cartAddress
      console.log('def', item)

      if (item) {
        defaultAddressInfo.info = {
          name: item.name,
          tel: item.tel,
          address:
            item.address ||
            item.province + item.city + item.county + item.addressDetail
        }
      } else {
        showDefault.value = true
      }
    })

    function onAddAddress() {
      router.push('/address-list')
    }

    // 提交订单栏--提交按钮事件
    function onSubmit() {
      const orderList = cartStore.cartList.filter((item) => {
        return item.isChecked === true
      })
      if (orderList.length > 0) {
        pay(orderList)
      }
    }

    // 提交订单栏--全选checkbox
    const checked = ref(false)

    function onAllChecked() {
      cartStore.checkAll(checked.value)
    }

    return {
      cartStore,
      defaultAddressInfo,
      onSubmit,
      checked,
      onAllChecked,
      showDefault,
      onAddAddress,
      themeVars
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
