import Vue from 'vue'
import VueRouter from 'vue-router'
import Success from '../views/success.vue'
import pay from '../views/paymentpage.vue'
import cart from '../views/cart.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name:'cart',
    component:cart
  },
  {
    path: '/success',
    name: 'Success',
    component:Success
  },
  {
    path:'/pay',
    name:'Pay',
    component:pay,
    props:(route) => ({ price: route.query.price })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
