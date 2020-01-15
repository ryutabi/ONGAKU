import { db } from '~/plugins/firebase'

export const state = () => ({
  postData: {
    id: '',
    organismUrl: ''
  }
})

export const mutations = {
  ADD_POST_ID(state, id) {
    state.postData.id = id
  },
  ADD_ORGANISM_URL(state, url) {
    state.postData.organismUrl = url
  }
}

export const actions = {
  addPostId({ commit }, id) {
    commit('ADD_POST_ID', id)
  },
  addOrganismUrl({ commit }, url) {
    commit('ADD_ORGANISM_URL', url)
  }
}
