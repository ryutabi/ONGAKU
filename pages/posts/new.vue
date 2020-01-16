<template>
  <div class="new_post__container">
    <div class="playback__container">
      <video
        :src="organismUrl"
        width="300"
        height="300"
        controls
      />
    </div>
    <div class="new_post">
      <form class="new_post__input_form">
        <app-input
          v-model="postData.title"
          inner-label="Title"
        />
        <app-input
          v-model="postData.place"
          inner-label="Place"
        />
        <app-textaria
          inner-label="What is the recording target?"
        />
        <app-textaria
          inner-label="How are your feeling now?"
        />
      </form>
      <div class="new_post__button__container">
        <app-button
          text="Cancel"
          color="gray"
          @click="postCancel()"
        />
        <app-button
          text="Submit"
          color="red"
          @click="postSubmit()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '~/plugins/firebase'
import AppInput from '~/components/AppInput'
import AppTextaria from '~/components/AppTextaria'
import AppButton from '~/components/AppButton'

const postsCollection = db.collection('posts')

export default {
  layout: 'blank',
  components: {
    AppInput,
    AppTextaria,
    AppButton
  },
  data:() => ({
    postData: {
      title: '',
      place: '',
      target: '',
      feeling: ''
    }
  }),
  computed: {
    ...mapState({
      postId: store => store.post.postData.id,
      organismUrl: store => store.post.postData.organismUrl
    })
  },
  methods: {
    postSubmit() {
      const submitPostData = {
        id: this.postId,
        organism_url: this.organismUrl,
        // user: {
        //   name: '',
        //   uid: '',
        //   icon_url: ''
        // },
        title: this.postData.title,
        place: this.postData.place,
        recording_target: this.postData.target,
        now_feeling: this.postData.feeling,
        posted_at: this.postId
      }

      postsCollection.doc(this.postId).set(submitPostData)
      .then(() => {
        console.log(`success!! post ID: ${this.postId}`)
        this.$router.push('/')
      })
    },
    postCancel() {
      this.$router.push('/')
    }
  }

}
</script>

<style lang="scss" scoped>
.new_post__container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.playback__container {
  margin: 0 auto;
  background-color: $bg-black;
  width: 100%;
  display: flex;
  justify-content: center;
}

.new_post {
  width: 30rem;
  margin: 0 auto;

  &__input_form {
    font-size: 1.4rem;
    padding: 1rem 0;
  }

  &__button__container {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
