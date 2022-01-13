import { App } from 'vue'

import {
  Sidebar,
  SidebarItem,
  Search,
  NavBar,
  Icon,
  ConfigProvider,
  Tabbar,
  TabbarItem
} from 'vant'

const vantArray: any[] = [
  Sidebar,
  SidebarItem,
  Search,
  NavBar,
  Icon,
  ConfigProvider,
  Tabbar,
  TabbarItem
]

function useVant(app: App): void {
  vantArray.forEach((vant) => {
    app.use(vant)
  })
}

export default useVant
