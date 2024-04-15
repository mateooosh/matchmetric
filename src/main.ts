import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'

// vant
import {
  ActionSheet,
  BackTop,
  Calendar,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Dialog,
  Empty,
  Field,
  Locale,
  NavBar,
  Notify,
  Picker,
  Popup,
  Stepper,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  TimePicker
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
  .use(ActionSheet)
  .use(VueApexCharts)
  .mount('#app')
