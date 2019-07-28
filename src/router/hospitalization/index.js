import Layout from '@/layout'
export default {
  path: '/hospitalization',
  component: Layout,
  redirect: 'patient',
  name: '住院管理',
  meta: {title: '住院管理', icon: 'example'},
  children: [
    {
      path: 'hospitalization',
      name: 'hospitalization',
      component: () => import('../../views/hospitalization/hospitalization'),
      meta: {title: '入院信息录入', icon: 'table'}
    },
    {
      path: 'hospitalization-list',
      name: 'hospitalization-list',
      component: () => import('../../views/hospitalization/hospitalization-list'),
      meta: {title: '入院检索', icon: 'table'},
    },
    {
      path: 'room',
      name: 'room',
      component: () => import('../../views/hospitalization/room/index'),
      meta: {title: '病房管理', icon: 'table'},
      children:[
        {
          path: 'advice',
          name: 'advice',
          component: () => import('../../views/hospitalization/room/advice'),
          meta: {title: '医嘱管理', icon: 'table'}
        },
        {
          path: 'bed',
          name: 'bed',
          component: () => import('../../views/hospitalization/room/bed'),
          meta: {title: '病床管理', icon: 'table'}
        },
      ]
    },
    {
      path: 'price',
      name: 'price',
      component: () => import('../../views/hospitalization/price'),
      meta: {title: '计费管理', icon: 'table'}
    },
    {
      path: 'statistics',
      name: 'statistics',
      component: () => import('../../views/hospitalization/statistics'),
      meta: {title: '统计制表', icon: 'table'}
    },
    {
      path: 'price-standard',
      name: 'price-standard',
      component: () => import('../../views/hospitalization/price-standard'),
      meta: {title: '收费标准管理', icon: 'table'}
    },

    {
      path: 'leave',
      name: 'leave',
      component: () => import('../../views/hospitalization/leave'),
      meta: {title: '出院管理', icon: 'table'}
    },

  ]
}


