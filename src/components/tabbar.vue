<template>
  <div class="tabbar">
    <van-config-provider :theme-vars="themeVars">
      <van-tabbar v-model="active" active-color="#ee0a24" fixed z-index="999">
        <van-tabbar-item icon="shop-o" @click="onShopClick"
          >商城</van-tabbar-item
        >
        <van-tabbar-item icon="apps-o" @click="onCateGoryClick"
          >分类</van-tabbar-item
        >
        <van-tabbar-item icon="cart-o" @click="onCartClick"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item icon="service-o" @click="onConsultClick"
          >咨询</van-tabbar-item
        >
      </van-tabbar>
    </van-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: '',
  setup() {
    // 修改vant组件样式
    const themeVars = {
      tabbarHeight: '50px'
    }

    // 设置tabBar默认索引值为当前页面对应的tabBar索引值
    const tabbarArray = ['/shop', '/category', '/cart', '/consult']
    const route = useRoute()
    const defaultIndex = tabbarArray.findIndex((item) => item == route.path)
    const active = ref(defaultIndex)

    const router = useRouter()
    // 点击"商城"事件
    function onShopClick() {
      router.replace('/shop')
    }
    // 点击"分类"事件
    function onCateGoryClick() {
      router.replace('/category')
    }
    // 点击"购物车"事件
    function onCartClick() {
      router.replace('/cart')
    }
    // 点击"咨询"事件
    function onConsultClick() {
      router.replace('/consult')
    }
    return {
      themeVars,
      active,
      onShopClick,
      onCateGoryClick,
      onCartClick,
      onConsultClick
    }
  }
})
</script>

<style scoped lang="less"></style>
