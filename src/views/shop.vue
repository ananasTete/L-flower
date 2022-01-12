<template>
  <div>
    <nav-bar message="商城"></nav-bar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  name: 'Shop'
})
</script>

<style scoped lang="less"></style>
