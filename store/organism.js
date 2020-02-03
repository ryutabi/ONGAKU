export const state = () => ({
  organisms: []
})

export const mutations = {
  SET_ORGANISM(state, data) {
    state.organisms.push(data)
  },
  RESET_ORGANISM(state, data) {
    state.organisms = state.organisms.filter(_data => _data !== data)  
  }
}

export const actions = {
  setOrganism({ commit }, data) {
    commit('SET_ORGANISM', data)
  },
  resetOrganism({ commit }, data) {
    commit('RESET_ORGANISM', data)
  }
}
