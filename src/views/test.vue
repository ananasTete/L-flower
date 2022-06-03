<template>
  <div class="test">
    <van-tabs
      class="tabs"
      color="#103AF1"
      lazy-render
      animated
      v-model="active"
      title-active-color="#103AF1"
    >
      <van-tab class="tab" title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.test {
  background: red;
  .tabs {
    background: pink;
    height: 100px;

    .van-tab {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: olive;
    }
    // .van-tab--line {
    //   background: pink;
    // }
    // .van-tab--active {
    //   background: pink;
    // }
  }
}
</style>
