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
      <!-- v-if 搜索历史 -->
      <search-history
        v-if="contentShow"
        class="search-history"
        @onHistoryItemClick="onSearch"
      ></search-history>

      <!-- v-else 搜索结果 -->
      <div v-else class="search-list" @click="onTabsClick">
        <!-- tab栏 -->
        <van-tabs v-model:active="active">
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

        <!-- 商品列表 -->
        <div class="list">
          <shop-list :search-list="searchResult.list"></shop-list>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onActivated, reactive } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SearchHistory from './Search/SearchHistory.vue'
import setSearchHistory from '@/utils/setSearchHistory'
import ShopList from '@/components/ShopList.vue'
import { search } from '@/api/search'

export default defineComponent({
  components: { NavBar, SearchHistory, ShopList },
  name: '',
  setup() {
    // 修改navbar中搜索栏样式
    const themeVars = {
      searchPadding: '0px'
    }

    // 决定搜索内容是搜索历史还是搜索结果列表的布尔值
    const contentShow = ref(true)

    // 保存搜索结果的变量
    const searchResult: { list: any[] } = reactive({ list: [] })

    // 绑定搜索栏内容及搜索事件
    const searchValue = ref('')

    function onSearch(value: string) {
      search(value).then((res: any) => {
        searchResult.list = res
      })
      setSearchHistory(value)
      contentShow.value = false
    }

    // 决定tab栏选中的索引值
    const active = ref(0)

    // 决定tab栏“价格”升序还是降序的布尔值及切换方法
    const priceSort = ref(true)
    function onPriceChangeClick() {
      priceSort.value = !priceSort.value
    }

    function onTabsClick() {
      switch (active.value) {
        case 0:
          searchResult.list.sort((a, b) => {
            if (a.id < b.id) return -1
            if (a.id > b.id) return 1
            return 0
          })
          break
        case 1:
          searchResult.list.sort((a, b) => {
            if (a.soldCount > b.soldCount) return -1
            if (a.soldCount < b.soldCount) return 1
            return 0
          })
          break
        case 2:
          if (priceSort.value) {
            // 降序
            searchResult.list.sort((a, b) => {
              if (a.price > b.price) return -1
              if (a.price < b.price) return 1
              return 0
            })
          } else {
            // 升序
            searchResult.list.sort((a, b) => {
              if (a.price < b.price) return -1
              if (a.price > b.price) return 1
              return 0
            })
          }
          break
        case 3:
          searchResult.list.sort((a, b) => {
            if (a.updateAt > b.updateAt) return -1
            if (a.updateAt < b.updateAt) return 1
            return 0
          })
          break

        default:
          break
      }
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
      contentShow,
      searchResult,
      onTabsClick
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

    .search-list {
      height: 100%;
      background-color: #f5f5f5;

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
        height: calc(100% - 88px);
        padding: 0 20px;
        overflow: auto;
      }
    }
  }
}
</style>
