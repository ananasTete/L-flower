<template>
  <div class="shop">
    <nav-bar title="商城" />

    <main class="main">
      <!-- 搜索框 -->
      <van-search
        class="search"
        v-model="value"
        placeholder="请输入搜索关键词"
        @click-input="onSearch"
      />

      <!-- 轮播图 -->
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swiper.list" :key="item">
          <img class="img" v-lazy="item" alt="" />
        </van-swipe-item>
      </van-swipe>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getSwiper } from '@/api/shop'

export default defineComponent({
  components: { NavBar },
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
    return {
      value,
      onSearch,
      swiper
    }
  }
})
</script>

<style scoped lang="less">
.shop {
  width: 750px;
  height: calc(100% - 100px);

  .main {
    height: calc(100% - 80px);
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .search {
      width: 100%;
      padding: 20px 0;
    }

    .swiper {
      width: 100%;
      border-radius: 20px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
