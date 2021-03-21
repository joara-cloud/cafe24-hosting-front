import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

// layout
import Default from '@/layout/Default.vue';
import blank from '@/layout/Blank.vue';

Vue.config.productionTip = false

Vue.component('default-layout', Default);
Vue.component('blank-layout', blank);

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
