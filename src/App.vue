<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <tab-bar class="tabbar" v-if="route.meta.isShowTabBar"></tab-bar>
  </div>
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
<style lang="less" scoped>
.app {
  width: 750px;
  height: 100vh;
}
</style>
