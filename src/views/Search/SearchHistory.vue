<template>
  <div class="search-history">
    <div class="title"><span>搜索历史</span></div>
    <div class="history">
      <template v-for="(item, index) in searchHistory" :key="index">
        <div class="item" @click="onHistoryItemClick(item)">{{ item }}</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import localCache from '@/utils/localCache'
import { defineComponent } from 'vue'

export default defineComponent({
  name: '',
  emits: ['onHistoryItemClick'],
  setup(props, { emit }) {
    // 获取搜索历史（本组件通过v-if展示，所以此不需要响应式）
    let searchHistory = localCache.getCache('searchHistory')

    // 点击搜索历史事件
    function onHistoryItemClick(value: string) {
      emit('onHistoryItemClick', value)
    }

    return {
      searchHistory,
      onHistoryItemClick
    }
  }
})
</script>

<style scoped lang="less">
.search-history {
  padding: 20px;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 30px;
    margin: 10px 0;
  }

  .history {
    height: calc(100% - 40px);
    display: flex;
    flex-wrap: wrap;

    .item {
      min-width: 50px;
      margin: 10px 10px 10px 0;
      padding: 10px;
      font-size: 32px;
      line-height: 50px;
      text-align: center;
      border-radius: 10px;
      background-color: #e5e7e9;
    }
  }
}
</style>
