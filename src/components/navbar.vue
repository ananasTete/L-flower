<template>
  <div class="nav-bar">
    <slot name="left">
      <div class="left">
        <van-icon name="arrow-left" size="18" color="#fff" @click="back" />
        返回
      </div>
    </slot>
    <slot name="center">
      <span class="center">{{ title }}</span>
    </slot>
    <slot name="right">
      <van-icon name="user-o" size="18" color="#fff" @click="send" />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Shop',
  props: {
    title: {
      type: String
    }
  },
  setup() {
    // 左右图标事件
    const router = useRouter()
    const back = () => {
      router.back()
    }
    const send = () => {
      router.push('/prefile')
    }
    return {
      back,
      send
    }
  }
})
</script>

<style scoped lang="less">
.nav-bar {
  color: #fff;
  background-color: #ee0a24;

  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;

  .left {
    display: flex;
    align-items: center;
    font-size: 25px;
  }

  .center {
    font-size: 32px;
  }
}
</style>
