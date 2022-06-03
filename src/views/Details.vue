<template>
  <div class="details">
    <nav-bar title="商品详情"></nav-bar>

    <main class="main">
      <!-- 轮播图 -->
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in flowerInfo.value.img_url" :key="item">
          <img class="img" v-lazy="item" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="content">
        <div class="show-info">
          <div class="title">
            <div class="name">{{ flowerInfo.value.name }}</div>
            <div class="language">{{ flowerInfo.value.language }}</div>
          </div>

          <div class="price-content">
            <div>
              <span class="price">￥{{ flowerInfo.value.price }}</span>
              <span class="oldPrice">{{ flowerInfo.value.oldPrice }}</span>
            </div>
            <div class="count">
              <img
                class="svg"
                @click="onReduceClick"
                src="~@/assets/img/reduce.svg"
                alt=""
              />
              {{ count }}
              <img
                class="svg"
                @click="onAddClick"
                src="~@/assets/img/add.svg"
                alt=""
              />
            </div>
          </div>

          <div class="soldCount">销量{{ flowerInfo.value.soldCount }}</div>

          <div class="advantage">
            <span>品牌连锁</span>
            <span>严选花材</span>
            <span>急速送达</span>
            <span>售后保证</span>
          </div>
        </div>

        <!-- 详情信息 -->
        <div class="detail-info">
          材料：
          <div class="item">{{ flowerInfo.value.material }}</div>
          附送：
          <div class="item">免费附送精美贺卡</div>
          说明：
          <div class="item">
            由于鲜花包扎各地的花艺师不同，可能在花束的形式和搭配上与图片不完全一致，但我们保证鲜花的主花材品种、新鲜程度、数量、颜色与说明一致，谢谢。
          </div>
        </div>

        <!-- 评论 -->
        <div class="comment-info"></div>
      </div>

      <!-- 展示图 -->
      <div class="show-img">
        <template v-for="item in flowerInfo.value.img_url" :key="item">
          <img class="img" v-lazy="item" alt="" />
        </template>
      </div>
    </main>

    <!-- 底部操作栏 -->
    <div class="details-bar">
      <van-action-bar>
        <van-action-bar-icon
          icon="chat-o"
          text="客服"
          @click="onServiceClick"
        />
        <van-action-bar-button
          type="warning"
          text="加入购物车"
          @click="onAddToCartClick"
        />
        <van-action-bar-button
          type="danger"
          text="立即购买"
          @click="onBuyNowClick"
        />
      </van-action-bar>
    </div>
    <van-popup round v-model:show="showPopUp" position="bottom">
      <div class="popup">
        <div class="cart">
          <img src="~@/assets/img/wepay.png" alt="" />
          <span>微信支付</span>
          <span>￥{{ totalPrice }}</span>
          <van-icon name="arrow" />
        </div>
        <div class="cart">
          <img src="~@/assets/img/alipay.png" alt="" />
          <span>支付宝支付</span>
          <span>￥{{ totalPrice }}</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import { defineComponent, reactive, onActivated, ref, computed } from 'vue'
import { getFlowerInfoById } from '@/api/search'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/store/Cart'
import localCache from '@/utils/localCache'

export default defineComponent({
  components: { NavBar },
  name: '',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cartStore = useCartStore()

    // 获取flower信息
    const flowerInfo: { value: any } = reactive({ value: [] })
    onActivated(() => {
      count.value = 1

      const { flowerId } = route.params

      getFlowerInfoById(flowerId as string).then(
        (res) => {
          flowerInfo.value = res
          console.log(flowerInfo.value)
        },
        (err) => {
          console.log('err', err)
        }
      )
    })

    // 定义购买数量的变量及加减方法
    const count = ref(1)

    function onReduceClick() {
      if (count.value > 1) {
        count.value -= 1
      }
    }
    function onAddClick() {
      count.value += 1
    }

    /** detail-bar事件 */

    // 点击客服按钮事件
    function onServiceClick() {
      router.push('/consult')
    }
    // 点击加入购物车按钮事件
    function onAddToCartClick() {
      const user = localCache.getCache('userInfo')
      if (!user) {
        router.push('/login')
        return
      }
      console.log('登陆了')

      const flower = flowerInfo.value
      const info = {
        userId: user.id,
        shopId: flower.id,
        name: flower.name,
        price: flower.price,
        count: count.value,
        isChecked: 0,
        img_url: flower.img_url[0]
      }
      cartStore.addToCart(info)
    }
    // 点击立即购买按钮事件
    const showPopUp = ref(false)
    function onBuyNowClick() {
      showPopUp.value = !showPopUp.value
      console.log('立即购买')
    }

    // 支付
    const payInfo = [
      {
        img: '~@/assets/img/wepay.png',
        name: '微信支付'
      },
      {
        img: '~@/assets/img/alipay.png',
        name: '支付宝支付'
      }
    ]

    // 总价
    const totalPrice = computed(() => flowerInfo.value.price * count.value)

    return {
      flowerInfo,
      onServiceClick,
      onAddToCartClick,
      onBuyNowClick,
      count,
      onReduceClick,
      onAddClick,
      showPopUp,
      payInfo,
      totalPrice
    }
  }
})
</script>

<style scoped lang="less">
.details {
  height: calc(100% - 100px);
  width: 100%;
  overflow: hidden;

  .main {
    height: calc(100% - 80px);
    background: #f2f2f2;
    overflow: auto;

    .swiper {
      width: 100%;

      .img {
        width: 100%;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .show-info {
        width: 90%;
        height: 260px;
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        overflow: hidden;

        .title {
          .name {
            font-weight: 800;
          }
          .language {
            font-size: 30px;
            color: #313131;
            line-height: 40px;
          }
        }
        .price-content {
          display: flex;
          justify-content: space-between;
          .price {
            color: red;
            margin-right: 5px;
          }
          .oldPrice {
            font-size: 32px;
            text-decoration: line-through;
            color: #999;
          }
          .count {
            width: 130px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .svg {
              width: 40px;
            }
          }
        }

        .advantage {
          color: #999;
          display: flex;
          justify-content: space-between;
          font-size: 29px;
        }

        .soldCount {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          width: auto;
          background: #f39c12;
          padding: 5px 10px;
          border-radius: 0 20px 0 20px;
          align-self: flex-end;
          font-size: 28px;
        }
      }

      .detail-info {
        width: 90%;
        padding: 20px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 20px;
        display: grid;
        grid-template-columns: 100px auto;
        grid-template-rows: auto;
        row-gap: 20px;
        font-size: 28px;
      }
    }

    .show-img {
      .img {
        width: 100%;
      }
    }
  }

  .details-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .popup {
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 30px;
    .cart {
      width: 96%;
      height: 150px;
      background-color: #f4f6f6;
      // border: 1px black solid;
      border-radius: 20px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-bottom: 50px;
    }
  }
}
</style>
