import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import 'vue-data-ui/style.css'

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
  Dialog,
  Picker
} from 'vant'
import 'vant/lib/index.css'
import VueApexCharts from 'vue3-apexcharts'

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
  .use(Picker)
  .use(VueApexCharts)
  .mount('#app')
