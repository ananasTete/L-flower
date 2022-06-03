import request from '@/network/request'

function pay(data: any) {
  return request.post({
    url: '/order',
    data
  })
}

function getOrders() {
  return request.get({
    url: '/order'
  })
}

function confirm(id: number) {
  return request.post({
    url: '/order/confirm',
    data: {
      id
    }
  })
}

export { pay, getOrders, confirm }
