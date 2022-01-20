<template>
  <div class="">
    <van-search
      v-model="message"
      @search="onSendMessage"
      shape="round"
      show-action
    >
      <template #left-icon></template>
      <template #action>
        <van-button
          round
          type="primary"
          @click="onSendMessage"
          color="#EC7063 "
          size="small"
          >发送</van-button
        >
      </template>
    </van-search>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: '',
  emits: ['sendMessage'],
  setup(props, context) {
    // 信息内容
    const message = ref('')

    // 发送信息事件
    function onSendMessage() {
      context.emit('sendMessage', message.value)
      message.value = ''
    }

    return {
      message,
      onSendMessage
    }
  }
})
</script>

<style scoped lang="less"></style>
