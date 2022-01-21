import request from '@/network/request'

function getSwiper() {
  return request.get({
    url: '/frontpage/swiper'
  })
}

export { getSwiper }
