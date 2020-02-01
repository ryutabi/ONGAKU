<template>
  <div>
    <div class="post_organism__container">
      <!-- 以下コンポーネント化 -->
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="post_organism"
      >
        <div
          class="post_organism__thumbnail"
          :style="getThumbnailImage(post.thumbnail_url)"
        />
        <div class="post_organism__feature">
          <div class="post_organism__feature__play_button">
            <play-button
              :organism-data="post.organism_url"
            />
          </div>
          <div class="post_organism__feature__info">
            <h3>{{ post.title }}</h3>
            <p>@{{ post.place }}</p>
            <p>#{{ post.recording_target }}</p>
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
import PlayButton from '~/components/PlayButton'

export default {
  components: {
    PlayButton
  },
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
    },
    getThumbnailImage(url) {
      return `background-image: url(${url})`
    },
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
  background-color: $bg-black;
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
  max-width: 80rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 8rem;
}

.post_organism {
  margin: 0 1rem 3rem;
  border: .1rem solid $color-black;
  border-radius: 1.2rem;
}

.post_organism__thumbnail {
  width: 16rem;
  height: 12rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  background-size: cover;
}

.post_organism__feature {
  display: flex;
  width: 16rem;
  height: 7rem;
  background-color: $bg-black;
  border-radius: 0 0 1rem 1rem;

  &__play_button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  &__info {
    padding: .5rem;
    color: $color-white;

    & > p {
      font-size: 1.2rem;
    }
  }
}

</style>
