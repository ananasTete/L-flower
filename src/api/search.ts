import request from '@/network/request'

function search(value: string) {
  return request.get({
    url: `/flower/search?q=${value}`
  })
}

export { search }
