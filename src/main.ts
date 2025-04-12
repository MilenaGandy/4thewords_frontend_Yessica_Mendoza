/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Importar el router
import router from '@/router'

const app = createApp(App)

// Configurar el cambio dinámico del título de la página
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Leyendas` : 'Leyendas';
})

registerPlugins(app)

app.use(router) // Asegurar que Vue use el router

app.mount('#app')
