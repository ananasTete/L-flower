import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import localCache from '../utils/localCache'

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  // baseURL: 'http://localhost:8000',
  timeout: 5000
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localCache.getCache('userInfo')?.token
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (err) => {
    // 可以使用el-message在页面提示错误信息(可选)
    return err
  }
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    // 可以使用el-message在页面提示错误信息(可选)
    return err
  }
)

const request = {
  get(config: AxiosRequestConfig) {
    return instance.request({ method: 'GET', ...config })
  },
  post(config: AxiosRequestConfig) {
    return instance.request({ method: 'POST', ...config })
  },
  delete(config: AxiosRequestConfig) {
    return instance.request({ method: 'DELETE', ...config })
  },
  patch(config: AxiosRequestConfig) {
    return instance.request({ method: 'PATCH', ...config })
  }
}

export default request

// https://axios-http.com/zh/docs/instance

// axios实例有原生的instance.get、instance.post等方法，但各方法参数不一，这里
// 将instance.request方法自己包装成get、post、delete、patch方法，只需传入统一的
// config参数即可，也不用在config中定义method
