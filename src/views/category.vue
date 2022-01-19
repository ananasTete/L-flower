<template>
  <div class="category">
    <nav-bar title="分类" />

    <div class="main">
      <slide-bar></slide-bar>
      <grid class="grid"></grid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SlideBar from './Category/SlideBar.vue'
import Grid from './Category/Grid.vue'

export default defineComponent({
  name: '',
  components: { NavBar, SlideBar, Grid }
})
</script>

<style scoped lang="less">
.category {
  height: calc(100% - 50px);
  overflow: hidden;

  .main {
    height: calc(100% - 40px);
    display: flex;
    .grid {
      flex-grow: 1;
    }
  }
}
</style>
