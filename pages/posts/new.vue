<template>
  <div class="new_post__container">
    <div
      class="new_post__thumbnail__container"
      :style="thumbnailImage"
    >
      <div>
        <label for="camera">
          <icon-camera
            :class="{'icon--active': isThumbnailUrl}"
          />
        </label>
        <input
          v-show="false"
          id="camera"
          type="file"
          accept="image/*"
          capture="environment"
          @change="getThumbnailImage"
        >
      </div>
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
          v-model="postData.target"
          inner-label="What is the recording target?"
        />
        <app-textaria
          v-model="postData.feeling"
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
import IconCamera from '~/components/Icons/IconCamera'

const postsCollection = db.collection('posts')

export default {
  layout: 'blank',
  components: {
    AppInput,
    AppTextaria,
    AppButton,
    IconCamera
  },
  data:() => ({
    postData: {
      title: '',
      place: '',
      target: '',
      feeling: ''
    },
    thumbnailImageUrl: null
  }),
  computed: {
    ...mapState({
      postId: store => store.post.postData.id,
      organismUrl: store => store.post.postData.organismUrl
    }),
    thumbnailImage() {
      return `background-image: url(${this.thumbnailImageUrl})`
    },
    isThumbnailUrl() {
      if (this.thumbnailImageUrl) {
        return true
      }
      return false
    }
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
    },
    getThumbnailImage(e) {
      const imageData = e.target.files[0]
      this.thumbnailImageUrl = URL.createObjectURL(imageData)
      console.log(imageData)
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

.new_post__thumbnail__container {
  background-color: $bg-black;
  width: 100vw;
  height: 75vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
}

.icon--active {
  opacity: 0.5;
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
