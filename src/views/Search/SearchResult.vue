<template>
  <div class="search-result">
    <!-- tab栏 -->
    <van-tabs v-model:active="active" @click="onTabsClick">
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
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import ShopList from '@/components/ShopList.vue'
import { searchByValue, searchByLabelId } from '@/api/search'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: '',
  components: { ShopList },
  setup() {
    const route = useRoute()
    const query = route.query
    const queryName = Object.keys(query)[0]

    // 定义保存搜索结果的变量
    const searchResult: { list: any[] } = reactive({ list: [] })

    if (queryName === 'q') {
      searchByValue(query.q as string).then((res: any) => {
        searchResult.list = res
      })
    } else if (queryName === 'id') {
      searchByLabelId(query.id as string).then((res: any) => {
        searchResult.list = res
        console.log(res)
      })
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

    return {
      searchResult,
      active,
      priceSort,
      onPriceChangeClick,
      onTabsClick
    }
  }
})
</script>

<style scoped lang="less">
.search-result {
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
</style>
