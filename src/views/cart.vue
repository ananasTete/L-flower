<template>
  <div>
    <nav-bar message="购物车"></nav-bar>
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
