<template>
  <nut-navbar
    class="navbar"
    title="商城"
    icon="my2"
    @on-click-back="back"
    @on-click-send="send"
  ></nut-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Shop',
  setup() {
    const router = useRouter()
    function back() {
      router.back()
    }
    function send() {
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
.navbar {
  margin: 0;
  height: 60px;
}
</style>
