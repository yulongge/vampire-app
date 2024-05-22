import { createStore, Store } from 'vuex'
import getters from "./getters"
import global from './modules/global'

const store: Store<any> = createStore({
  modules: {
    global,
  },
  getters
})

export default store