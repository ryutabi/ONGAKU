<template>
  <div class="taking_image__container">
    <div class="taking_image__camera">
      <video
        ref="camera"
        :width="getDeviceWidth"
        :height="getCameraHeight"
        playsinline="true"
      />
    </div>

    <div class="thumbnail_image__container">
      <canvas
        ref="image"
        :width="getDeviceWidth"
        :height="getCameraHeight"
      />
    </div>

    <div class="photo_button__container">
      <photo-button
        class="photo_button"
        @click="takeImage"
      />
      <div class="cameraBtn">
        <label for="cam">
          カメラ起動
        </label>
        <input id="cam" type="file" accept="image/*" capture="environment" value="Camera" />
      </div>
    </div>
  </div>
</template>

<script>
import PhotoButton from '~/components/PhotoButton'

window.addEventListener('click', e => {console.log(e)})

export default {
  layout: 'blank',
  components: {
    PhotoButton
  },
  computed: {
    getDeviceWidth() {
      const screenWidth = window.parent.screen.width
      if (screenWidth > 640) return 640
      return screenWidth
    },
    getCameraHeight() {
      return this.getDeviceWidth / 4 * 3
    }
  },
  created() {
    navigator.mediaDevices.getUserMedia({
      // video: true,
      video: { facingMode: { exact: "environment" } },
      audio: false
    })
    .then(stream => {
      this.$refs.camera.srcObject = stream
      this.$refs.camera.play()
      alert(this.$refs.camera.width)
      alert(this.$refs.camera.height)
    })
    .catch(e => {
      alert(e)
    })
  },
  methods: {
    takeImage() {
      const camera = this.$refs.camera
      camera.pause()
      const ctx = this.$refs.image.getContext('2d')
      ctx.drawImage(camera, 0, 0, this.getDeviceWidth, this.getCameraHeight)
      const blob = this.$refs.image.toBlob(blob => {
        alert(blob.size)
        alert(blob.type)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.taking_image__container {
  background-color: $bg-black;
  height: 100vh;
}

.taking_image__camera {
  display: flex;
  justify-content: center;
  position: relative;
}

.camera_mask--top {
  background-color: #000;
  opacity: 0.7;
  width: 100vw;
  height: 10rem;
  position: absolute;
  top: 0;
}

.camera_mask--bottom {
  background-color: #000;
  opacity: 0.7;
  width: 100vw;
  height: 10rem;
  position: absolute;
  bottom: 0;
}

.thumbnail_image__container {
  display: flex;
  justify-content: center;
}

.photo_button {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5rem;
  }
  position: fixed;
  bottom:0;
}

.cameraBtn {
  color: #fff;
} 
</style>
