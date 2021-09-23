const store = {
  namespaced: true,
  state: {
    breadcrumbList: ['首页']

  },
  mutations: {
    SETBREADCRUMBLIST (state: any, value: any) {
      state.breadcrumbList = value
    }
  },
  actions: {
    setbreadcrumblist ({ commit }: any, val: any) {
      commit('SETBREADCRUMBLIST', val)
    }
  }
}

export default store
