<template>
  <div class="login">
    <van-form @submit="loginShop">
      <van-cell-group inset>
        <van-field
          v-model="userName"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>

    <span class="tips">未注册将自动注册</span>

    <van-loading
      class="loading"
      size="50px"
      text-color="#0094ff"
      color="#0094ff"
      v-if="isLoading"
      vertical
      >登陆中...</van-loading
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login, register } from '@/api/login'
import { useUserStore } from '@/store/User'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

const userName = ref('')
const password = ref('')

const isLoading = ref(false)

async function loginShop() {
  isLoading.value = true

  const res: any = await login(userName.value, password.value)

  if (res) {
    if (!res.returnCode) {
      // 登录成功
      userStore.updateUserInfo(res)
      router.back()
      isLoading.value = false
      return
    } else if (res.returnCode === 20003) {
      // 未注册
      const res: any = await register(userName.value, password.value)
      if (res && !res.returnCode) {
        isLoading.value = false
        loginShop()
      }
    } else {
      // 登录失败（存在returnCode但不为20003）
      isLoading.value = false
      Toast({
        type: 'fail',
        message: res.message,
        duration: 2000
      })
    }
  } else {
    Toast({
      type: 'fail',
      message: '登录出错！',
      duration: 2000
    })
  }
}
</script>

<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .tips {
    color: #808080;
    font-size: 28px;
  }

  .loading {
    position: absolute;
  }
}
</style>
