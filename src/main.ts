import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'

// vant
import { Field, NavBar, CellGroup, Stepper, Calendar, Cell } from 'vant'
import 'vant/lib/index.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Field)
  .use(CellGroup)
  .use(Stepper)
  .use(Calendar)
  .use(Cell)
  // .use(DatePicker)
  .use(NavBar)
  .mount('#app')
