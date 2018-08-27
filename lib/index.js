import Scroller from './components/Scroller.vue'

function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('scroll', Scroller)
}

const scroll = {
  install: install,
  Scroller
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(scroll)
}

export default scroll
