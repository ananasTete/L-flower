<template>
  <div class="shop-list">
    <template v-for="item in searchList" :key="item.id">
      <div class="item" @click="onItemClick(item)">
        <div class="img-div">
          <img v-lazy="item.img_url[0]" alt="" class="img" />
        </div>
        <div class="item-content">
          <div class="title">{{ item.name }}</div>
          <div class="introduce">{{ item.material }}</div>
          <div class="price">
            售价: <span class="red-price">￥{{ item.price }}</span>
          </div>
          <div class="count">月销:{{ item.soldCount }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: '',
  props: {
    searchList: {
      type: Array as PropType<any[]>
    }
  },
  setup() {
    const router = useRouter()

    function onItemClick(item: any) {
      router.push(`/details/${item.id}`)
    }

    return {
      onItemClick
    }
  }
})
</script>

<style scoped lang="less">
// 不设置高度，由item撑开
.shop-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 49%;
    height: 500px;
    border-radius: 20px;
    margin: 10px 0;
    overflow: hidden;
    background-color: #fff;

    .img-div {
      width: 100%;
      height: 350px;
      // overflow: hidden;

      .img {
        width: 100%;
      }
    }

    .item-content {
      height: 150px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      font-size: 25px;
      padding: 0 10px;

      .title {
        grid-column-start: 1;
        grid-column-end: 3;
        font-size: 30px;
        font-weight: 500;
        align-self: center;
      }

      .introduce {
        grid-column-start: 1;
        grid-column-end: 3;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #808080;
      }
      .red-price {
        color: #db4453;
      }
      .count {
        justify-self: end;
      }
    }
  }
}
</style>
