<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <tab-bar v-if="route.meta.isShowTabBar"></tab-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from '@/components/TabBar.vue'

export default defineComponent({
  name: '',
  components: {
    TabBar
  },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>

<style lang="less"></style>
