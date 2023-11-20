import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameDetailsView from '../views/GameDetailsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'home'}
  },
  {
    path: '/matchmetric/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/matchmetric/game-details/:id',
    name: 'game-details',
    component: GameDetailsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router