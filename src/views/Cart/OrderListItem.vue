<template>
  <div class="order-list-item">
    <!-- 选中按钮 -->
    <div class="choose" @click="onChooseItemClick">
      <img
        v-if="!cartItem.isChecked"
        class="choose-item"
        src="~@/assets/img/cart/unChoose.png"
        alt=""
      />
      <img
        v-else
        class="choose-item"
        src="~@/assets/img/cart/choose.png"
        alt=""
      />
    </div>

    <!-- 商品图片 -->
    <div class="img-content">
      <img class="img" :src="cartItem.img_url" alt="" />
    </div>

    <!-- 商品简介 -->
    <div class="item-content">
      <div class="title">{{ cartItem.name }}</div>
      <div class="price">￥{{ cartItem.price }}</div>
      <div class="count">
        <img
          class="svg"
          @click="reduceCount"
          src="~@/assets/img/reduce.svg"
          alt=""
        />
        {{ cartItem.count }}
        <img class="svg" @click="addCount" src="~@/assets/img/add.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useCartStore } from '@/store/Cart'

export default defineComponent({
  name: '',
  props: {
    cartItem: {
      type: Object as PropType<any>,
      required: true
    }
  },
  setup(props) {
    const cartStore = useCartStore()

    const id: number = props.cartItem.shopId

    function onChooseItemClick() {
      cartStore.changeChecked(id)
    }

    function addCount() {
      cartStore.addCount(id)
    }
    function reduceCount() {
      cartStore.reduceCount(id)
    }

    return {
      addCount,
      reduceCount,
      onChooseItemClick
    }
  }
})
</script>

<style scoped lang="less">
.order-list-item {
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
  background: #fadbd8;
  border-radius: 20px;
  margin-bottom: 20px;

  .choose {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .choose-item {
      width: 60px;
      height: 60px;
    }
  }

  .img-content {
    height: 95%;
    border-radius: 10px;
    overflow: hidden;
    .img {
      height: 100%;
    }
  }

  .item-content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .title {
      margin-left: 20px;
    }
    .price {
      margin-left: 20px;
      color: red;
    }
    .count {
      line-height: 50px;
      align-self: flex-end;
      display: flex;
      align-items: center;

      .svg {
        margin: 0 20px;
        width: 50px;
      }
    }
  }
}
</style>
