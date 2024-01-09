import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Matchmetric',
        short_name: 'Matchmetric',
        description: 'Track your performance.'
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/common/styles/variables.scss";`,
      }
    }
  },
  base: process.env.NODE_ENV === 'production'
    ? '/matchmetric/'
    : '/'
})
