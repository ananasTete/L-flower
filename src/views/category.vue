<template>
  <div class="category">
    <nav-bar title="分类" />

    <div class="main">
      <!-- 侧边栏 -->
      <van-sidebar v-model="active" class="van-sidebar">
        <template v-for="item in category.list" :key="item.id">
          <van-sidebar-item class="sidebar-item" :title="item.name" />
        </template>
      </van-sidebar>

      <!-- 标签宫格 -->
      <div class="grid">
        <van-config-provider :theme-vars="themeVars">
          <van-grid :border="false">
            <template
              v-for="item in category.list[active]?.labels"
              :key="item.id"
            >
              <van-grid-item
                :text="item.name"
                class="grid-item"
                @click="onGridItemClick(item.id)"
              >
                <template #icon>
                  <div class="item-img">
                    <img :src="item.imgUrl" alt="" class="img" />
                  </div>
                </template>
              </van-grid-item>
            </template>
          </van-grid>
        </van-config-provider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getCategory } from '@/api/category'
import { CategoryType } from '@/views/Category/types'

export default defineComponent({
  name: '',
  components: { NavBar },
  setup() {
    const themeVars = {
      gridItemContentPadding: '10px 0px',
      gridItemTextFontSize: '13px'
    }
    // 侧边导航选中索引值
    const active = ref(0)

    // 请求分类及标签信息
    const category: { list: CategoryType[] | [] } = reactive({ list: [] })
    getCategory().then((res: any) => {
      category.list = res
    })

    // 路由跳转
    const router = useRouter()
    function onGridItemClick(id: number) {
      router.push('/search')
    }
    return {
      themeVars,
      active,
      category,
      onGridItemClick
    }
  }
})
</script>

<style scoped lang="less">
.category {
  height: calc(100% - 100px);

  .main {
    height: calc(100% - 80px);
    display: flex;
    .van-sidebar {
      width: 150px;
      height: 100%;
      background: #f7f8fa;

      .sidebar-item {
        text-align: center;
      }
    }
    .grid {
      width: calc(100% - 150px);

      .grid-item {
        .item-img {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            width: 70%;
          }
        }
      }
    }
  }
}
</style>
