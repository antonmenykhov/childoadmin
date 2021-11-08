import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCookie from 'vue-cookie'
import moment from 'moment'
import 'moment/locale/ru';
moment.locale('ru')
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.use(VueCookie);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
