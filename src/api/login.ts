import request from '@/network/request'

function login(userName: string, password: string) {
  return request.post({
    url: '/login',
    data: {
      name: userName,
      password
    }
  })
}

function register(userName: string, password: string) {
  return request.post({
    url: '/users',
    data: {
      name: userName,
      password
    }
  })
}

export { login, register }
