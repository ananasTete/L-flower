<template>
  <div class="list">
    <main class="content">
      <template v-for="item in searchList" :key="item.id">
        <div class="item">
          <div class="img-div">
            <img :src="item.img_url[0]" alt="" class="img" />
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
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: '',
  props: {
    searchList: {
      type: Array as PropType<any[]>
    }
  }
})
</script>

<style scoped lang="less">
.list {
  padding: 0 20px;
  overflow: auto;
  background-color: #f5f5f5;

  .content {
    overflow: auto;
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
}
</style>
