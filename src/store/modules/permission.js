 // store/permission.js
import { constantRoutes as routes } from '@/router'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  namespaced: true,

  state: {
    routes: routes
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routes = routers
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = routes.filter(v => {
          if (roles.indexOf('admin') >= 0) return true
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission

