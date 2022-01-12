<template>
  <div class="tabbar">
    <nut-tabbar>
      <nut-tabbar-item
        tab-title="商城"
        icon="shop"
        @click="onShopClick"
      ></nut-tabbar-item>
      <nut-tabbar-item
        tab-title="分类"
        icon="category"
        @click="onCateGoryClick"
      ></nut-tabbar-item>
      <nut-tabbar-item
        tab-title="购物车"
        icon="cart"
        @click="onCartClick"
      ></nut-tabbar-item>
      <nut-tabbar-item
        tab-title="咨询"
        icon="message"
        @click="onConsultClick"
      ></nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  setup() {
    const router = useRouter()
    function onShopClick() {
      router.replace('/shop')
    }
    function onCateGoryClick() {
      router.replace('/category')
    }
    function onCartClick() {
      router.replace('/cart')
    }
    function onConsultClick() {
      router.replace('/consult')
    }
    return {
      onShopClick,
      onCateGoryClick,
      onCartClick,
      onConsultClick
    }
  }
})
</script>

<style scoped lang="less">
.tabbar {
  width: 750px;
  height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
