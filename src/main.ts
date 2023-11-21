import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import '@/styles/tailwindcss.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  app.mount('#app')
}

bootstrap()
