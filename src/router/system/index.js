import Layout from '@/layout'
export default {
  path: '/system',
  component: Layout,
  redirect: 'register',
  name: 'system',
  meta: {title: '系统管理', icon: 'example'},
  children: [
    {
      path: 'authority',
      name: 'authority',
      component: () => import('../../views/system/authority'),
      meta: {title: '用户权限管理', icon: 'table'}
    },

    {
      path: 'mediciner',
      name: 'mediciner',
      component: () => import('../../views/system/mediciner'),
      meta: {title: '就医人员', icon: 'table'}
    },
    {
      path: 'price',
      name: 'price',
      component: () => import('../../views/system/price'),
      meta: {title: '收费类型代码表', icon: 'table'},
    }

  ]
}


