<template>
  <div class="consult">
    <nav-bar title="咨询" />

    <main class="main">
      <chat ref="chatRef"></chat>
      <chat-input class="input" @send-message="onSendMessage"></chat-input>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Chat from './Consult/Chat.vue'
import ChatInput from './Consult/ChatInput.vue'

export default defineComponent({
  name: '',
  components: { NavBar, Chat, ChatInput },
  setup() {
    const chatRef = ref<InstanceType<typeof Chat>>()

    function onSendMessage(message: string) {
      if (message) {
        chatRef.value?.sendMessage(message)
      }
    }
    return {
      onSendMessage,
      chatRef
    }
  }
})
</script>

<style scoped lang="less">
.consult {
  height: calc(100%);

  .main {
    height: calc(100% - 80px);
    display: flex;
    flex-direction: column;

    .chat {
      flex-grow: 1;
    }

    .input {
      height: 100px;
    }
  }
}
</style>
