import Scroll from './components/Scroll'

function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('scroll', Scroll)
}

const scroll = {
  install: install,
  Scroll
}

if (typeof window !== undefined && window.Vue) {
  window.Vue.use(scroll)
}

export default scroll
