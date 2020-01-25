<template>
  <div class="taking_image__container">
    <div class="taking_image__camera">
      <video
        ref="camera"
        :srcObject.prop="localStream"
        width="320"
        height="240"
        playsinline="true"
      />
    </div>

    <div>
      <canvas
        ref="image"
        width="320"
        height="240"
      />
    </div>

    <div class="photo_button__container">
      <photo-button
        class="photo_button"
        @click="takeImage"
      />
    </div>
  </div>
</template>

<script>
import PhotoButton from '~/components/PhotoButton'

// window.addEventListener('click', e => {console.log(e)})

export default {
  layout: 'blank',
  components: {
    PhotoButton
  },
  data:() => ({
    localStream: null
  }),
  created() {
    navigator.mediaDevices.getUserMedia({
      // video: true,
      video: { facingMode: { exact: "environment" } },
      audio: false
    })
    .then(stream => {
      alert('get stream')
      this.localStream = stream
      // this.$refs.camera.srcObject = stream
      this.$refs.camera.play()
      alert('camera play')
    })
    .catch(e => {
      alert(e)
      alert('can not get stream')
    })
  },
  methods: {
    takeImage() {
      // const camera = this.$refs.camera
      this.$refs.camera.pause()
      alert('camera pause')
      setTimeout(this.$refs.camera.play(), 500)
      const ctx = this.$refs.image.getContext('2d')
      // const thumbnailImage = camera
      ctx.drawImage(this.$refs.camera, 0, 0, 320, 240)
      alert('get photo')
    }
  }

}
</script>

<style lang="scss" scoped>
.taking_image__container {
  background-color: $bg-black;
  height: 100vh;
}

.photo_button {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
  }
  position: fixed;
  bottom:0;
}
</style>
