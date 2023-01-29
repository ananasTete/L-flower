<template>
  <div class="profile">
    <header class="header">
      <van-image
        class="avatar"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="name">{{ username }}</div>
    </header>
    <main class="main">
      <van-tabs v-model:active="activeIndex" @click="onTabsChange">
        <van-tab title="待发货"></van-tab>
        <van-tab title="待收货"> </van-tab>
        <van-tab title="退款/售后"> </van-tab>
        <van-tab title="全部商品"> </van-tab>
      </van-tabs>
      <van-swipe
        ref="swipeRef"
        @change="swipeChange"
        class="my-swiper"
        :loop="false"
        :show-indicators="false"
      >
        <!-- 1 -->
        <van-swipe-item class="swiper-item">
          <div class="content">
            <template v-for="item in a.list" :key="item.id">
              <van-card
                :num="item.count"
                :price="item.price"
                desc=""
                :title="item.name"
                :thumb="item.img_url"
              >
                <template #footer>
                  <van-button size="mini" @click="onConfirm(item.id)"
                    >确认收货</van-button
                  >
                </template>
              </van-card>
            </template>
          </div>
        </van-swipe-item>
        <!-- 2 -->
        <van-swipe-item class="swiper-item">
          <div class="content">
            <template v-for="item in b.list" :key="item.id">
              <van-card
                :num="item.count"
                :price="item.price"
                desc=""
                :title="item.name"
                :thumb="item.img_url"
              >
                <template #footer>
                  <van-button size="mini" @click="onConfirm(item.id)"
                    >确认收货</van-button
                  >
                </template>
              </van-card>
            </template>
          </div>
        </van-swipe-item>
        <!-- 3 -->
        <van-swipe-item class="swiper-item">
          <div class="content">
            <template v-for="item in c.list" :key="item.id">
              <van-card
                :num="item.count"
                :price="item.price"
                desc=""
                :title="item.name"
                :thumb="item.img_url"
              >
              </van-card>
            </template>
          </div>
        </van-swipe-item>
        <!-- 4 -->
        <van-swipe-item class="swiper-item">
          <div class="content">
            <template v-for="item in orderList.list" :key="item.id">
              <van-card
                :num="item.count"
                :price="item.price"
                desc=""
                :title="item.name"
                :thumb="item.img_url"
              >
              </van-card>
            </template>
          </div>
        </van-swipe-item>
      </van-swipe>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/User'
import { computed, ref, onActivated, reactive } from 'vue'
import type { SwipeInstance } from 'vant'
import { getOrders, confirm } from '@/api/order'

const userStore = useUserStore()
const username = computed(() => userStore.userInfo.name || '未登录')
const activeIndex = ref(0)

const swipeRef = ref<SwipeInstance>()

function onTabsChange(index: number) {
  swipeRef.value?.swipeTo(index)
}

function swipeChange(index: number) {
  activeIndex.value = index
}

// 订单
const a = reactive({ list: [] })
const b = reactive({ list: [] })
const c = reactive({ list: [] })
const orderList = reactive({ list: [] })

function reset() {
  getOrders().then((res: any) => {
    orderList.list = res
    console.log('订单信息', orderList.list)
    a.list = orderList.list.filter((item: any) => {
      console.log(item)
      return item.status === 0
    })
    b.list = orderList.list.filter((item: any) => item.status === 1)
    c.list = orderList.list.filter((item: any) => item.status === 2)
  })
}

onActivated(() => {
  reset()
})

function onConfirm(id: number) {
  confirm(id).then((res: any) => {
    console.log(res)
  })
  reset()
}
</script>

<style scoped lang="less">
.profile {
  height: calc(100% - 100px);
  background-color: #ec7063;

  .header {
    height: 240px;
    display: flex;
    align-items: center;
    .avatar {
      height: 150px;
      width: 150px;
      margin-left: 50px;
    }
    .name {
      font-size: 40px;
      font-weight: 700;
      margin-left: 20px;
    }
  }
  .main {
    background-color: #fff;
    overflow: hidden;
    height: calc(100% - 240px);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    .content {
      height: calc(100% - 80px);
      overflow: auto;
    }
    .my-swiper {
      height: 100%;

      .swiper-item {
        height: 100%;
        width: 100%;
        padding-top: 20px;
      }
    }
  }
}
</style>
