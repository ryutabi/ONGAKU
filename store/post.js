import { db } from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const postsCollection = db.collection('posts')

export const state = () => ({
  feedPosts: [],
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
  initPosts: firestoreAction( async ({ bindFirestoreRef }) => {
    await bindFirestoreRef('feedPosts', postsCollection.orderBy('posted_at', 'desc'))
  }),
  addPostId({ commit }, id) {
    commit('ADD_POST_ID', id)
  },
  addOrganismUrl({ commit }, url) {
    commit('ADD_ORGANISM_URL', url)
  }
}
