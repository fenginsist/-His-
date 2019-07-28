import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import HospitalizationRouter from './hospitalization'
import OutpatientRouter from './outpatient'
import PharmacyRouter from './pharmacy'
import MedicalRecordRouter from './medical-record'
import SystemRouter from './system'
import UserRouter from './user'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      alwaysShow: true,
      meta: { title: '首页', icon: 'dashboard' ,affix: true,noCache:false,}
    }]
  },
  HospitalizationRouter,
  OutpatientRouter,
  PharmacyRouter,
  MedicalRecordRouter,
  UserRouter,
  SystemRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
