import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/creator.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/quiz',
    name:'Quiz',
    component:()=>import('../views/quiz.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
