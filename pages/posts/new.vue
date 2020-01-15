<template>
  <div class="new_post__container">
    <div class="playback__container">
      <video
        :src="organismUrl"
        width="240"
        height="240"
        controls
      />
    </div>
    <div class="new_post">
      <form>
        <input
          v-model="postData.title"
          type="text"
          value="Title"
        >
        <input
          v-model="postData.place"
          type="text"
          value="Place"
        >
        <span>
          What is the recording target?
        </span>
        <textarea
          v-model="postData.target"
          cols="20"
          rows="5"
        />
        <span>
          How are your feeling now?
        </span>
        <textarea
          v-model="postData.feeling"
          cols="20"
          rows="5"
        />
      </form>
      <div class="new_post__button__container">
        <button>
          CANCEL
        </button>
        <button @click="postSubmit()">
          POST
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '~/plugins/firebase'

const postsCollection = db.collection('posts')

export default {
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
        // this.$router.push('/')
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  input, textarea {
    display: block;
  }
</style>
