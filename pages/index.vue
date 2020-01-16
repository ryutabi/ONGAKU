<template>
  <div>
    <div class="post_organism__container">
      <!-- 以下コンポーネント化 -->
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="post_organism"
      >
        <div class="organism__container">
          <video
            :src="post.organism_url"
            width="150"
            height="150"
            controls
          />
        </div>
        <div class="post_organism__feature">
          <!-- <div class="post_organism__feature__play_button">
            再生 ▶
          </div> -->
          <div class="post_organism__feature__info">
            <h2>{{ post.title }}</h2>
            <p>{{ post.place }}</p>
            <p>{{ post.recording_target }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recording__container">
      <div
        class="recording_icon"
        @click="linkToRecording()"
      >
        ＋
      </div>
    </div>
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
    ...mapActions('post', ['initPosts']),
    linkToRecording() {
      this.$router.push('/recording')
    }
  }

}
</script>

<style lang="scss" scoped>
.recording__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  background-color: $bg-black-color;
  text-align: center;
  font-size: 2rem;
  position: fixed;
  bottom: 0;
}
.recording_icon {
  font-size: 3.6rem;
  font-weight: bold;
  color: $color-white;
  background-color: $color-primary;
  border: .2rem solid $color-white;
  width: 5rem;
  height: 5rem;
  line-height: 4.6rem;
  border-radius: 50%;
}

.post_organism__container {
  max-width: 60rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 8rem;
}

.post_organism {
  margin: 0 1.6rem 3rem;
  border: .1rem solid $color-black;
  border-radius: 1.2rem;
}

.organism__container {
  width: 15rem;
  height: 15rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
}

.post_organism__feature {
  display: flex;
  justify-content: space-between;
}

.post_organism__feature__info {
  padding: .5rem;
}
</style>
