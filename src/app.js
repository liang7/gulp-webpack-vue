/**
 *  use vue.js 2.0 
 */
import './assets/css/app.css'
import Vue from 'vue'
import router from './routers'
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
import cosApp from './components/app.vue'
import filter from './utils/filter'
import directive from './utils/directive'
import moment from './lib/moment.min'
import com from './utils/common'

Vue.moment = moment
Vue.com = com
Vue.observer = new Vue()

sync(store, router)
// Start up our app and set Routers
const App = new Vue({
	router,
	store,
	render: h => h(cosApp)
}).$mount('#app')