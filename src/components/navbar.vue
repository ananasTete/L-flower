<template>
  <div class="nav-bar">
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar :title="title" left-arrow>
        <template #left>
          <van-icon name="arrow-left" size="18" color="red" @click="back" />
          返回
        </template>
        <template #right>
          <van-icon name="user-o" size="18" color="red" @click="send" />
        </template>
      </van-nav-bar>
    </van-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Shop',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    // 修改vant组件样式
    const themeVars = {
      navBarHeight: '40px',
      navBarTitleFontSize: '16px',
      navBarTitleTextColor: 'red'
    }

    // 左右图标事件
    const router = useRouter()
    const back = () => {
      router.back()
    }
    const send = () => {
      router.push('/prefile')
    }
    return {
      themeVars,
      back,
      send
    }
  }
})
</script>

<style scoped lang="less">
.nav-bar {
  width: 750px;
  color: #ee0a24;
}
</style>
