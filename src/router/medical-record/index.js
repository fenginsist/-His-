import Layout from '@/layout'
export default {
  path: '/medical-record',
  component: Layout,
  redirect: 'register',
  name: 'disease-coding',
  meta: { title: '病案管理', icon: 'example' },
  children: [
    {
      path: 'disease-coding',
      name: 'disease-coding',
      component: () => import('../../views/medical-record/disease-coding.vue'),
      meta: { title: '国际疾病编码', icon: 'table' }
    },
    {
      path: 'medical-record',
      name: 'medical-record',
      component: () => import('../../views/medical-record/medical-record.vue'),
      meta: { title: '病案', icon: 'table' }
    },
    {
      path: 'operation',
      name: 'operation',
      component: () => import('../../views/medical-record/operation.vue'),
      meta: { title: '手术情况', icon: 'table' }
    },
    {
      path: 'disease-record',
      name: 'disease-record',
      component: () => import('../../views/medical-record/disease-record.vue'),
      meta: { title: '病历', icon: 'table' }
    }

  ]
}

