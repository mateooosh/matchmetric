import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameDetailsView from '../views/GameDetailsView.vue'
import EditGameView from '../views/EditGameView.vue'
import SettingsView from '../views/SettingsView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'home' }
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
  },
  {
    path: '/matchmetric/edit-game',
    name: 'new-game',
    component: EditGameView
  },
  {
    path: '/matchmetric/edit-game/:id',
    name: 'edit-game',
    component: EditGameView
  },
  {
    path: '/matchmetric/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/matchmetric/settings/analytics',
    name: 'analytics',
    component: AnalyticsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router