import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import New from '../views/New.vue'
import Product from '../views/Product.vue'
// 做一下 加载条配置(导入)
import NProgress from "nprogress"
import "nprogress/nprogress.css"


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/news/:id',
    name: 'new',
    component: New
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 加载条真配置
router.beforeEach((to, from, next) => {//路由跳转前
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {//路由跳转后
  NProgress.done()
})



export default router
