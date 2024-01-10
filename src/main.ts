import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'

// vant
import {
  BackTop,
  Calendar,
  Cell,
  CellGroup,
  Field,
  Locale,
  NavBar,
  Popup,
  Stepper,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  TimePicker,
  Collapse,
  CollapseItem,
  Switch,
  Empty,
  Notify,
  Dialog
} from 'vant'
import 'vant/lib/index.css'
import enUS from 'vant/es/locale/lang/en-US'


Locale.use('en-US', enUS)

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Field)
  .use(CellGroup)
  .use(Stepper)
  .use(Calendar)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  // .use(DatePicker)
  .use(NavBar)
  .use(BackTop)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Popup)
  .use(TimePicker)
  .use(Collapse)
  .use(CollapseItem)
  .use(Switch)
  .use(Empty)
  .use(Notify)
  .use(Dialog)
  .mount('#app')
