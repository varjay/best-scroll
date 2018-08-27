import index from '../views/index'
import basic from '../views/basic'
import contacts from '../views/contacts'
var routes = [
  {
    path: '/',
    nav: true,
    name: 'best scroll',
    meta: {
      title: 'appname',
      nav: 1,
    },
    component: index,
  },
  {
    path: '/basic',
    nav: true,
    name: '基本用法',
    meta: {
      title: 'appname',
      nav: 1,
    },
    component: basic,
  },
  {
    path: '/contacts',
    nav: true,
    name: '通讯录',
    meta: {
      title: 'appname',
      nav: 1,
    },
    component: contacts,
  },
]
export default routes
