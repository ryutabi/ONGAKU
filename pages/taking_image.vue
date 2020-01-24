<template>
  <div class="taking_image__container">
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
  created() {

  },
  methods: {
    takeImage() {
      console.log('撮影！！')
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
