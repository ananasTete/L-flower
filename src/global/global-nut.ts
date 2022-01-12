import { App } from 'vue'
import {
  Navbar,
  Icon,
  Swiper,
  SwiperItem,
  Tabbar,
  TabbarItem
} from '@nutui/nutui'
const nutArray: any[] = [Navbar, Icon, Swiper, SwiperItem, Tabbar, TabbarItem]

function useNut(app: App): void {
  nutArray.forEach((nut) => {
    app.use(nut)
  })
}

export default useNut
