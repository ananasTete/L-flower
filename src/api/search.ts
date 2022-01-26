import request from '@/network/request'

// 搜索匹配flower信息
function search(value: string) {
  return request.get({
    url: `/flower/search?q=${value}`
  })
}

// 获取所有flower信息
function searchAll() {
  return request.get({
    url: `/flower`
  })
}
export { search, searchAll }
