import Layout from '@/layout'
export default {
  path: '/user',
  component: Layout,
  redirect: 'register',
  name: 'user',
  meta: {title: '人事管理', icon: 'example'},
  children: [
    {
      path: 'staff',
      name: 'staff',
      component: () => import('../../views/user/user-base-mess'),
      meta: {title: '人事基本资料表', icon: 'table'}
    },
    {
      path: 'contact',
      name: 'contact',
      component: () => import('../../views/user/family-social-relationship'),
      meta: {title: '家庭主要成员与社会关系', icon: 'table'}
    }

  ]
}


