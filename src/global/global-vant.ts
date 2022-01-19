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
  GridItem
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
  GridItem
]

function useVant(app: App): void {
  vantArray.forEach((vant) => {
    app.use(vant)
  })
}

export default useVant
