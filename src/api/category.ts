import request from '@/network/request'

function getCategory() {
  return request.get({
    url: '/category/label/list'
  })
}

export { getCategory }
