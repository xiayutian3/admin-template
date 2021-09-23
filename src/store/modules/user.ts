const store = {
  namespaced: true,
  state: {
    code: '',
    userId: '',
    groupId: '',
    loginuserInfo: {
      email: '',
      token: '123',
      userName: ''
    }

  },
  mutations: {
    SETCODE (state: any, value: any) {
      state.code = value
    },
    SETUSERID (state: any, value: any) {
      state.userId = value
    },
    SETGROUPID (state: any, value: any) {
      state.groupId = value
    },
    SETLOGINUSERINFO (state: any, value: any) {
      state.loginuserInfo = value
    }
  },
  actions: {
    setcode ({ commit }: any, val: any) {
      commit('SETCODE', val)
    },
    setuserid ({ commit }: any, val: any) {
      commit('SETUSERID', val)
    },
    setgroupid ({ commit }: any, val: any) {
      commit('SETGROUPID', val)
    },
    setloginuserinfo ({ commit }: any, val: any) {
      commit('SETLOGINUSERINFO', val)
    }

  }
}

export default store
