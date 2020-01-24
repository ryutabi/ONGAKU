<template>
  <div class="taking_image__container">
    <div class="taking_image__camera">
      <video
        ref="camera"
        width="360"
        height="240"
      />
    </div>

    <div>
      <canvas
        ref="image"
        width="360"
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

export default {
  layout: 'blank',
  components: {
    PhotoButton
  },
  data:() => ({
  }),
  created() {
    navigator.mediaDevices.getUserMedia({
      // video: true,
      video: { width: 360, height: 240 },
      // facingMode: { exact: "environment" },
      audio: false
    })
    .then(stream => {
      this.$refs.camera.srcObject = stream
      this.$refs.camera.play()
      // console.log(this.$refs.camera.offsetWidth, this.$refs.camera.offsetHeight)
    })
  },
  methods: {
    takeImage() {
      const camera = this.$refs.camera
      camera.pause()
      setTimeout(camera.play(), 500)
      const ctx = this.$refs.image.getContext('2d')
      const thumbnailImage = camera
      ctx.drawImage(camera, 0, 0, 360, 240)
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
