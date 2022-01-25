import { App } from 'vue'

import {
  Sidebar,
  SidebarItem,
  Search,
  NavBar,
  Icon,
  ConfigProvider,
  Tabbar,
  TabbarItem,
  SubmitBar,
  Checkbox,
  Button,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Loading
} from 'vant'

const vantArray: any[] = [
  Sidebar,
  SidebarItem,
  Search,
  NavBar,
  Icon,
  ConfigProvider,
  Tabbar,
  TabbarItem,
  SubmitBar,
  Checkbox,
  Button,
  Grid,
  GridItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  Loading
]

function useVant(app: App): void {
  vantArray.forEach((vant) => {
    app.use(vant)
  })
}

export default useVant
