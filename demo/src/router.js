import Vue from 'vue'
import Router from 'vue-router'

import Index from './components/index.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {name:'home',path:'/',component:Index},
    {path:'/login',component:Login},
    {path:'/register',component:Register}

  ]
})
