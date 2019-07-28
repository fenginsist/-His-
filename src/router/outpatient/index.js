import Layout from '@/layout'
export default {
  path: '/outpatient',
  component: Layout,
  redirect: 'register',
  name: 'outpatient',
  meta: {title: '门诊管理', icon: 'example'},
  children: [
    {
      path: 'register',
      name: 'register',
      component: () => import('../../views/outpatient/register'),
      meta: {title: '挂号', icon: 'table'}
    },
    {
      path: 'price',
      name: 'price',
      component: () => import('../../views/outpatient/price'),
      meta: {title: '计价收费', icon: 'table'}
    },
    {
      path: 'card',
      name: 'card',
      component: () => import('../../views/outpatient/card'),
      meta: {title: '医疗卡管理', icon: 'table'}
    },
    {
      path: 'manager',
      name: 'manager',
      meta: {title: '其他管理系统', icon: 'table'},
      component: () => import('../../views/outpatient/manager'),
      children:[
        {
          path: 'outpatient',
          name: 'outpatient',
          component: () => import('../../views/outpatient/manager/outpatient'),
          meta: {title: '门诊科目', icon: 'table'}
        },
        {
          path: 'doctor',
          name: 'doctor',
          component: () => import('../../views/outpatient/manager/doctor'),
          meta: {title: '医生科室', icon: 'table'}
        },
        {
          path: 'check',
          name: 'check',
          component: () => import('../../views/outpatient/manager/check'),
          meta: {title: '检查项目', icon: 'table'}
        }
      ]
    },


  ]
}


