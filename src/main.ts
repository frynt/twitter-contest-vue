import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import TweeterList from '@/components/admin/tweeter/TweeterList.vue';
import TweeterAdd from '@/components/admin/tweeter/TweeterAdd.vue';
import Admin from '@/components/admin/Admin.vue';
import TweeterContest from '@/components/TweeterContest.vue';
import { ValidationProvider } from 'vee-validate';

import './app.scss'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false;

Vue.use(VueRouter);
const routes = [
  { path: '/', component: TweeterContest },
  { path: '/admin', component: Admin },
  { path: '/admin/tweeter', component: TweeterList },
  { path: '/admin/tweeter/add', component: TweeterAdd }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
