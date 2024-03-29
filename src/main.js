import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import axios from 'axios'
Vue.prototype.$axios = axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
// index.js or main.js
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


import filter from '@/filters/filter'
// 全局导入过滤器
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]));

/**
 * If you don't want to use mock-server
 * you want to use mockjs for request interception
 * you can execute:
 *
 * import { mockXHR } from '../mock'
 * mockXHR()
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
