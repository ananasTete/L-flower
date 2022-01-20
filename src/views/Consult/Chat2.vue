<template>
  <div class="chat">
    <template v-for="(item, index) in infoList" :key="index">
      <div class="chat-message left" v-if="item.position === 'left'">
        {{ item.info }}
      </div>
      <div class="chat-message right" v-else>{{ item.info }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onActivated, onDeactivated } from 'vue'
import { infoType } from './types'

export default defineComponent({
  name: '',
  setup() {
    let socket: WebSocket
    const infoList: infoType[] = reactive([])

    // 进入"咨询"页面时建立连接
    onActivated(() => {
      socket = new WebSocket('ws://localhost:8025/user/1')

      socket.onopen = () => {
        console.log('连接成功')
      }
      socket.onclose = () => {
        console.log('连接关闭')
      }
      socket.onerror = () => {
        console.log('连接错误')
      }
      socket.onmessage = async (event) => {
        let info: any = event.data

        if (typeof event.data !== 'string') {
          await new Promise((resolve) => {
            const reader: FileReader = new FileReader()
            reader.readAsText(event.data, 'utf-8')
            reader.onload = function () {
              info = reader.result
              resolve(info)
            }
          })
        }
        infoList.push({ position: 'left', info: info })
      }
    })

    // 离开"咨询"页面时关闭连接
    onDeactivated(() => {
      socket.close()
    })

    // 向服务器发送信息的函数
    function sendMessage(info: string) {
      if (socket.readyState == WebSocket.OPEN) {
        socket.send(info)
        infoList.push({ position: 'right', info: info })
      }
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
}
</style>
