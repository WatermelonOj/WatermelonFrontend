// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Router from "./router.js"
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'


Vue.component('icon', Icon)
Vue.use(element)
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.component(CollapseTransition.name, CollapseTransition)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
