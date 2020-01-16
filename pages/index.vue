<template>
  <div>
    <h1>ONGAKU</h1>
    <p>{{ feedPosts }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      feedPosts: store => store.post.feedPosts
    })
  },
  created() {
    this.initPosts()
  },
  methods: {
    ...mapActions('post', ['initPosts'])
  }

}
</script>

<style>

</style>
