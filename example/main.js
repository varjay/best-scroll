import Vue from 'vue'
import App from '../example/App'
import scroll from '../lib/'
console.log(scroll)
Vue.use(scroll)

new Vue({
  el: '#app',
  components: {
    App
  },
  render: h => h(App)
})
