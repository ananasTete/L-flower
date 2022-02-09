<template>
  <div class="search-page">
    <nav-bar>
      <template #right>
        <van-config-provider :theme-vars="themeVars">
          <van-search
            class="search"
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            autofocus
          />
        </van-config-provider>
      </template>
    </nav-bar>

    <main class="main">
      <router-view @onHistoryItemClick="onSearch"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import NavBar from '@/components/NavBar.vue'
import setSearchHistory from '@/utils/setSearchHistory'

import { useRouter } from 'vue-router'

export default defineComponent({
  components: { NavBar },
  name: '',
  setup() {
    const router = useRouter()

    // 修改navbar中搜索栏样式
    const themeVars = {
      searchPadding: '0px'
    }

    // 绑定搜索栏内容及搜索事件
    const searchValue = ref('')

    function onSearch(value: string) {
      setSearchHistory(value)
      router.push({
        path: '/search/search-result',
        query: { q: value }
      })
    }

    return {
      themeVars,
      searchValue,
      onSearch
    }
  }
})
</script>

<style scoped lang="less">
.search-page {
  height: 100%;
  .search {
    background-color: red;
    width: 550px;
  }

  .main {
    height: calc(100% - 80px);
  }
}
</style>
