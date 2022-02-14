import request from '@/network/request'

function getSwiper() {
  return request.get({
    url: '/frontpage/swiper'
  })
}

function addShopToCart(cartInfo: any) {
  return request.post({
    url: '/cart',
    data: {
      cartInfo
    }
  })
}

export { getSwiper, addShopToCart }
