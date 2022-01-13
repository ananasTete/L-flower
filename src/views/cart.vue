<template>
  <div>
    <nav-bar title="购物车" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: {
    NavBar
  },
  name: 'Cart'
})
</script>

<style scoped lang="less"></style>
