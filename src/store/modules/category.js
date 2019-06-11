/* eslint-disable no-unused-vars */
import { instanceCategoryApi } from '../../api'

export default {
  namespaced: true,
  state: {
    category: {
      meta: {},
      data: [],
    },
  },
  mutations: {
    setAll: (state, resp) => {
      state.category = resp;
    },
  },
  getters: {
  },
  actions: {
    getAll({ commit }, payload) {
      instanceCategoryApi.list(payload, (resp) => commit('setAll', resp));
    },
  },
}