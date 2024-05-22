import { initConfig } from '@/api/global'
import { setStorageSync } from '@/utils/storage'

const state = {
  userInfo: {}
}

const mutations = {
  initConfig(state, data) {
    state.userInfo = Object.assign({}, data, { token: 'testToken'})
    setStorageSync('userInfo', state.userInfo)
  },
}

const actions = {
  async initConfig(context, data = {}) {
    // const res = await initConfig()
    // if(res.data.code === 200) {
    //   context.commit('initConfig', res.data.data)
    // }
    context.commit('initConfig', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}