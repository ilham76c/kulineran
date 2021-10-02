import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/css/main.css'

// Working in Vue 3
// const app = createApp(App);
// app.use(BootstrapVue)
// app.use(BootstrapVueIcons)
// app.use(router)
// app.config.productionTip = false;
// app.mount('#app');

// Working in Vue 2
// Vue.use(VueToast);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
