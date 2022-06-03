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
  Loading,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Toast,
  Form,
  Field,
  CellGroup,
  AddressList,
  AddressEdit,
  ContactCard,
  Image as VanImage,
  Card,
  Popup
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
  Loading,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Toast,
  Form,
  Field,
  CellGroup,
  AddressList,
  AddressEdit,
  ContactCard,
  VanImage,
  Card,
  Popup
]

function useVant(app: App): void {
  vantArray.forEach((vant) => {
    app.use(vant)
  })
}

export default useVant
