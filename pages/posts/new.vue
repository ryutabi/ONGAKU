<template>
  <div class="new_post__container">
    <div
      class="new_post__thumbnail__container"
      :style="thumbnailImage"
    >
      <div class="camera_control__container">
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
          @change="inputImage"
        >
      </div>
    </div>
    <div class="playback__container">
      <audio
        :src="organismUrl"
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
import { db, storage } from '~/plugins/firebase'
import AppInput from '~/components/AppInput'
import AppTextaria from '~/components/AppTextaria'
import AppButton from '~/components/AppButton'
import IconCamera from '~/components/icons/IconCamera'

const postsCollection = db.collection('posts')
const thumbnailStorageRef = storage.ref('thumbnails')

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
      feeling: '',
      thumbnail_url: ''
    },
    localImageData: null,
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
    inputImage(e) {
      const imageData = e.target.files[0]
      this.localImageData = imageData
      this.thumbnailImageUrl = URL.createObjectURL(imageData)
    },
    async postSubmit() {
      await this.updateThumbnailImage(this.localImageData)

      const submitPostData = {
        id: this.postId,
        organism_url: this.organismUrl,
        thumbnail_url: this.postData.thumbnail_url,
        user: {
          name: '',
          uid: '',
          icon_url: ''
        },
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
    async updateThumbnailImage(data) {
      const thumbnailRef = thumbnailStorageRef.child(this.postId)
      await thumbnailRef.put(data).then(snapshot => {
        console.log(`upload success!!: ${snapshot.state}`)
      })
      await thumbnailRef.getDownloadURL().then(url => {
        this.postData.thumbnail_url = url
      })
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

.playback__container {
  margin: 3rem auto 0;
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
