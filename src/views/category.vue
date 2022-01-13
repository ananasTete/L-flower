<template>
  <div class="category">
    <nav-bar title="分类" />
    <div class="main">
      <slide-bar class="slidebar"></slide-bar>
      <div class="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SlideBar from '@/components/SlideBar.vue'

export default defineComponent({
  name: '',
  components: { NavBar, SlideBar }
})
</script>

<style scoped lang="less">
.category {
  height: calc(100% - 100px);
  overflow: hidden;
}
</style>
