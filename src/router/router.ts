import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameDetailsView from '../views/GameDetailsView.vue'
import AddGameView from '../views/AddGameView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'home'},
    meta: { transition: 'slide-left' }
  },
  {
    path: '/matchmetric/',
    name: 'home',
    component: HomeView,
    meta: { transition: 'slide-left' }
  },
  {
    path: '/matchmetric/game-details/:id',
    name: 'game-details',
    component: GameDetailsView,
    meta: { transition: 'slide-left' }
  },
  {
    path: '/matchmetric/add-game',
    name: 'add-game',
    component: AddGameView,
    meta: { transition: 'slide-left' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router