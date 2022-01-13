<template>
  <div class="slidebar">
    <van-config-provider :theme-vars="themeVars">
      <van-sidebar v-model="active" class="van-sidebar">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </van-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '',
  setup() {
    // 修改vant组件样式
    const themeVars = {
      sidebarWidth: '40px'
    }

    // 侧边导航选中索引值
    const active = ref(0)

    return { themeVars, active }
  }
})
</script>

<style scoped lang="less">
.van-sidebar {
  width: 200px;
  height: 100%;
}
</style>
