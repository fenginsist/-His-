import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import store from '@/store'
NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  let hasToken =  store.getters.token
  if (hasToken) {
    next()
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
