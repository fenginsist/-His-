import Layout from '@/layout'
export default {
  path: '/pharmacy',
  component: Layout,
  redirect: 'register',
  name: 'pharmacy',
  meta: {title: '中西药房管理', icon: 'example'},
  children: [
    {
      path: 'in',
      name: 'in',
      component: () => import('../../views/pharmacy/inStore.vue'),
      meta: {title: '入库管理', icon: 'table'}
    },
    {
      path: 'out',
      name: 'out',
      component: () => import('../../views/pharmacy/outStore.vue'),
      meta: {title: '出库管理', icon: 'table'}
    },
    {
      path: 'price',
      name: 'price',
      component: () => import('../../views/pharmacy/pharmacyprice.vue'),
      meta: {title: '调价处理', icon: 'table'},
    },
   /* {
      path: 'query',
      name: 'query',
      component: () => import('@/views/table/index'),
      meta: {title: '入库情况查询', icon: 'table'},
    },*/
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('../../views/pharmacy/supplier.vue'),
      meta: {title: '供应商编码处理', icon: 'table'},
    },

   /* {
      path: 'department',
      name: 'department',
      component: () => import('../../views/pharmacy/department.vue'),
      meta: {title: '部门编码', icon: 'table'},
    },*/

  ]
}


