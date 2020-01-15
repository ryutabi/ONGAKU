import { db } from '~/plugins/firebase'

export const state = () => ({
  postData: {
    id: null,
    organismUrl: null
  }
})

export const mutations = {
  ADD_ORGANISM_URL(state, url) {
    state.postData.organismUrl = url
  }
}

export const actions = {
  addOrganismUrl({ commit }, url) {
    commit('ADD_ORGANISM_URL', url)
  }
}
