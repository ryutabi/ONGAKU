<template>
  <div>
    <h1 class="heading">ONGAKU</h1>
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
          <div class="post_organism__feature__play_button">
            再生 ▶
          </div>
          <div class="post_organism__feature__info">
            <h2>{{ post.title }}</h2>
            <p>{{ post.place }}</p>
            <p>{{ post.recording_target }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recording">
      <div
        class="icon_record"
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
.heading {
  font-family: 'Comfortaa';
  font-size: 4.2rem;
  padding: 1.4rem;
  text-align: center;
}
.recording {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  background-color: #000;
  text-align: center;
  font-size: 2rem;
}
.icon_record {
  font-size: 3.6rem;
  font-weight: bold;
  color: #fafafa;
  background-color: #ff0055;
  border: .2rem solid #fafafa;
  width: 5rem;
  height: 5rem;
  line-height: 4.6rem;
  border-radius: 50%;
}

.post_organism__container {
  max-width: 42rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
}

.post_organism {
  margin: 0 1rem 3rem;
  border: .1rem solid #000;
  border-radius: 1.2rem;
}

.organism__container {
  width: 15rem;
  height: 16rem;
  border-radius: 1rem;
  overflow: hidden;
}


.post_organism__feature {
  display: flex;
  justify-content: space-between;
}
</style>
