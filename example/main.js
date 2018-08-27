import VueRouter from 'vue-router'
import routes from './router/'
import Vue from 'vue'
import App from '../example/App'
import scroll from '../lib/'
Vue.use(VueRouter)
Vue.use(scroll)

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  render: h => h(App)
})

let setScreem = function() {
  let rem = document.documentElement.clientWidth / 16
  window.rem = rem
  let em = (window.em = window.em = Math.sqrt((rem - 20) * 0.9) + 20)
  document.querySelector('html').style.fontSize = rem + 'px'
  document.body.style.fontSize = em + 'px'
}
window.onresize = function() {
  setScreem()
}
setScreem()
