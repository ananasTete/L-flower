<template>
  <div class="search-list">
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
      <!-- 搜索框 -->
      <search-history
        class="search-history"
        v-if="contentShow"
        @onHistoryItemClick="onSearch"
      ></search-history>

      <!-- tab栏 -->
      <van-tabs v-model:active="active" v-else>
        <van-tab title="综合"></van-tab>
        <van-tab title="销量"> </van-tab>
        <van-tab>
          <template #title>
            <div class="title-slot" @click="onPriceChangeClick">
              价格
              <div class="icon-img" v-if="active === 2">
                <van-icon v-if="priceSort" class="icon" name="arrow-down" />
                <van-icon v-else class="icon" name="arrow-up" />
              </div>
            </div>
          </template>
        </van-tab>
        <van-tab title="新品"></van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SearchHistory from './Search/SearchHistory.vue'
import setSearchHistory from '@/utils/setSearchHistory'

export default defineComponent({
  components: { NavBar, SearchHistory },
  name: '',
  setup() {
    // 修改navbar中搜索栏样式
    const themeVars = {
      searchPadding: '0px'
    }

    // 决定tab栏选中的索引值
    const active = ref(0)

    // 决定tab栏价格升序还是降序的布尔值及切换方法
    const priceSort = ref(true)
    function onPriceChangeClick() {
      priceSort.value = !priceSort.value
    }

    // 决定搜索内容是搜索历史还是搜索结果列表的布尔值
    const contentShow = ref(true)

    // 搜索栏内容及搜索事件
    const searchValue = ref('')
    function onSearch(value: string) {
      console.log('搜索事件', value)
      setSearchHistory(value)
      contentShow.value = false
    }

    // 切入此视图时的初始化
    onActivated(() => {
      active.value = 0
      priceSort.value = true
      contentShow.value = true
      searchValue.value = ''
    })

    return {
      themeVars,
      active,
      priceSort,
      onPriceChangeClick,
      searchValue,
      onSearch,
      contentShow
    }
  }
})
</script>

<style scoped lang="less">
.search-list {
  height: 100%;
  .search {
    background-color: red;
    width: 550px;
  }

  .main {
    height: calc(100% - 80px);
    .search-history {
    }
  }

  .title-slot {
    display: flex;
    .icon-img {
      display: flex;
      align-items: center;
      width: 30px;
      height: 20px;
      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .list {
    height: calc(100% - 200px);
  }
}
</style>
