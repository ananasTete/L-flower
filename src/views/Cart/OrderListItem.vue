<template>
  <div class="order-list-item">
    <div class="choose">
      <img
        v-if="!chooseItem"
        class="choose-item"
        src="~@/assets/img/cart/unChoose.png"
        alt=""
        @click="onChooseItemClick"
      />
      <img
        v-else
        class="choose-item"
        src="~@/assets/img/cart/choose.png"
        alt=""
        @click="onChooseItemClick"
      />
    </div>

    <div class="img"></div>

    <div class="item-content">
      <div class="title"></div>
      <div class="detail"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '',
  setup() {
    const chooseItem = ref(false)

    function onChooseItemClick() {
      chooseItem.value = !chooseItem.value
    }

    return {
      chooseItem,
      onChooseItemClick
    }
  }
})
</script>

<style scoped lang="less">
.order-list-item {
  width: 100%;
  height: 250px;
  display: flex;
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

  .img {
    width: 40%;
    height: 100%;
  }

  .item-content {
    flex-grow: 1;
    height: 100%;
  }
}
</style>
