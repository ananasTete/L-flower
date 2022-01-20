<template>
  <div class="chat">
    <template v-for="(item, index) in infoList" :key="index">
      <div class="chat-message" :class="item.position">
        {{ item.info }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onActivated, onDeactivated } from 'vue'
import { io, Socket } from 'socket.io-client'
import { infoType } from './types'

export default defineComponent({
  name: '',
  setup() {
    const infoList: infoType[] = reactive([])
    let socket: Socket
    onActivated(() => {
      socket = io('ws://localhost:8000')

      socket.on('connect', () => {
        console.log('连接成功')
        socket.emit('userOnLine')
      })

      socket.on('connect_error', () => {
        socket.emit('userOffLine')
        console.log('连接失败')
      })

      socket.on('disconnect', () => {
        console.log('断开连接')
      })

      socket.on('greeting', (info: string) => {
        infoList.push({ position: 'left', info: info })
      })

      socket.on('chatMessage', (message) => {
        infoList.push({ position: 'left', info: message })
      })

      socket.on('statusMessage', (message: string) => {
        infoList.push({ position: 'center', info: message })
      })
    })

    onDeactivated(() => {
      socket.emit('userOffLine')
      socket.disconnect()
    })

    function sendMessage(message: string) {
      console.log(message)

      socket.emit('userChatMessage', message)
      infoList.push({ position: 'center', info: message })
    }

    return {
      infoList,
      sendMessage
    }
  }
})
</script>

<style scoped lang="less">
.chat {
  background: #fdedec;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .chat-message {
    width: auto;
    height: auto;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    font-size: 30px;
    color: red;
    margin: 5px 0;
  }

  .left {
    align-self: flex-start;
  }
  .right {
    align-self: flex-end;
  }
  .center {
    align-items: center;
    margin: 20px 0;
    padding: 5px 0;
    width: 100%;
    text-align: center;
    border-radius: 0px;
    background: #fdedec;
    color: #f1948a;
    letter-spacing: 2px;
  }
}
</style>
