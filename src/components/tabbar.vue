<template>
  <div class="tabbar">
    <van-config-provider :theme-vars="themeVars">
      <van-tabbar v-model="active" active-color="#ee0a24" fixed z-index="999">
        <van-tabbar-item icon="shop-o" @click="onItemClick(0)"
          >商城</van-tabbar-item
        >
        <van-tabbar-item icon="apps-o" @click="onItemClick(1)"
          >分类</van-tabbar-item
        >
        <van-tabbar-item icon="cart-o" @click="onItemClick(2)"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item icon="user-o" @click="onItemClick(3)"
          >我的</van-tabbar-item
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
    const router = useRouter()
    const route = useRoute()

    // 修改vant组件样式
    const themeVars = {
      tabbarHeight: '50px'
    }

    // 设置tabBar默认索引值为当前页面对应的tabBar索引值
    const tabbarArray = ['/shop', '/category', '/cart', '/profile']
    const defaultIndex = tabbarArray.findIndex((item) => item == route.path)
    const active = ref(defaultIndex)

    // 路由跳转
    function onItemClick(index: number) {
      router.replace(tabbarArray[index])
    }
    return {
      themeVars,
      active,
      onItemClick
    }
  }
})
</script>

<style scoped lang="less"></style>
