import request from '@/network/request'

function getSwiper() {
  return request.get({
    url: '/frontpage/swiper'
  })
}

function updateShopToCart(cartInfo: any) {
  return request.post({
    url: '/cart',
    data: {
      cartInfo
    }
  })
}

function uploadAddress(addressInfo: any) {
  return request.post({
    url: '/address',
    data: {
      addressInfo
    }
  })
}

function getAddressListById(id: number) {
  return request.get({
    url: '/address'
  })
}

function editAddressListById(address: any) {
  return request.patch({
    url: '/address',
    data: {
      address
    }
  })
}

function deleteAddressById(id: number) {
  return request.patch({
    url: `/address/${id}`
  })
}

export {
  getSwiper,
  updateShopToCart,
  uploadAddress,
  getAddressListById,
  editAddressListById,
  deleteAddressById
}
