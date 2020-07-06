import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  {
    path:'/tel',
    name:'tel',
    component:()=>import('../components/tel.vue')
  },
  {
    path: '/fcreate',
    name: 'Fcreator',
    component: () => import('../components/fillcreator.vue')
  },
  {
    path: '/fblank',
    name: 'fill_in_the_blanks',
    component:()=>import('../components/fill_in_the_blanks.vue')
  },  
  {
    path:'/cart',
    name:'cart',
    component:()=>import('../views/cart.vue')
  },
  {
    path:'/quiz',
    name:'mtf',
    component:()=>import('../components/mtf.vue'),
    props:(route) => ({ prevscore: route.query.score,nos:route.query.noq })
  },
  {
    path:'/maq',
    name:'maq',
    component:()=>import('../components/maq.vue'),
    props:(route) => ({ prevscore: route.query.score,nos:route.query.noq })
  },
  {
    path:'/tf',
    name:'tf',
    component:()=>import('../components/tf.vue'),
    props:(route) => ({ prevscore: route.query.score,nos:route.query.noq })
  },
  {
    path:'/creator',
    name:'Navigator',
    component:()=>import('../views/Generator.vue')
  },
  {
    path:'/test',
    name:'Quiz',
    component:()=>import('../components/mcq.vue')
  },
  {
    path:'/sen',
    name:'sen',
    component:()=>import('../components/arrangeinorder.vue'),
    props:(route) => ({ prevscore: route.query.score,nos:route.query.noq })
  },
  {
    path:'/complete',
    name:'complete',
    component:()=>import('../components/complete.vue'),
    props:(route) => ({ prevscore: route.query.score,nos:route.query.noq })
  },
  {
    path:'/otp',
    name:'otp',
    component:()=>import('../components/otp.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component:()=>import('../views/success.vue')
  },
  {
    path:'/pay',
    name:'Pay',
    component:()=>import('../views/paymentpage.vue'),
    props:(route) => ({ price: route.query.price })
  }
  
]

const router = new VueRouter({
  routes
})

export default router
