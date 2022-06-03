<template>
  <div class="shop">
    <nav-bar :showLeft="false" title="商城" />

    <!-- 搜索框 -->
    <van-search
      class="search"
      v-model="value"
      placeholder="请输入搜索关键词"
      @click-input="onSearch"
    />

    <main class="main">
      <!-- 轮播图 -->
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiper.list" :key="item">
          <img class="img" v-lazy="item" alt="" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品列表 -->
      <shop-list class="list" :search-list="searchResult.list"></shop-list>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getSwiper } from '@/api/shop'
import { searchAll } from '@/api/search'
import ShopList from '@/components/ShopList.vue'

export default defineComponent({
  components: { NavBar, ShopList },
  name: 'Shop',
  setup() {
    // 搜索框
    const router = useRouter()
    const value = ref('')
    function onSearch() {
      router.push('/search')
    }

    // 请求轮播图
    let swiper = reactive({
      list: []
    })
    getSwiper().then((res: any) => {
      swiper.list = res
    })

    // 请求全部商品数据，并保存到store
    const searchResult: { list: any[] } = reactive({ list: [] })
    searchAll()
      .then((res: any) => {
        searchResult.list = res
      })
      .catch((err) => {
        console.log('shop.vue/searchAll()', err)
      })

    return {
      value,
      onSearch,
      swiper,
      searchResult
    }
  }
})
</script>

<style scoped lang="less">
.shop {
  width: 750px;
  height: calc(100% - 100px);
  background-color: #f5f5f5;

  .search {
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
  }

  .main {
    height: calc(100% - 178px);
    padding: 0 20px;
    overflow: auto;

    .swiper {
      width: 100%;
      height: 266px;
      border-radius: 20px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
