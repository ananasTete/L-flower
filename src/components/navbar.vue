<template>
  <nut-navbar
    class="navbar"
    :title="message"
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
  props: {
    message: {
      type: String,
      required: true
    }
  },
  setup() {
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
.navbar {
  margin: 0;
  height: 60px;
}
</style>
