<template>
  <div>
    <nav-bar title="商城" />
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  components: { NavBar },
  name: 'Shop',
  setup() {
    //搜索框事件
    const value = ref('')
    function onSearch() {
      console.log('search事件触发')
    }
    return {
      value,
      onSearch
    }
  }
})
</script>

<style scoped lang="less"></style>
