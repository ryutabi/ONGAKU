<template>
  <div
    class="play_button__container"
    @click="handleClick"
  >
    <icon-play
      v-if="!isPlaying"
    />
    <icon-pause 
      v-if="isPlaying"
    />
  </div>
</template>

<script>
import IconPlay from '~/components/icons/IconPlay'
import IconPause from '~/components/icons/IconPause'

export default {
  components: {
    IconPlay,
    IconPause
  },
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>

</style>