import request from '@/network/request'

// 搜索匹配flower信息
function searchByValue(value: string) {
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

// 根据flowerId获取flower信息
function getFlowerInfoById(flowerId: string | number) {
  return request.get({
    url: `/flower/${flowerId}`
  })
}

// 根据类别id请求flower信息接口
function searchByLabelId(id: string | number) {
  return request.get({
    url: `/category/search?id=${id}`
  })
}
export { searchByValue, searchAll, getFlowerInfoById, searchByLabelId }
