<template>
  <div
    class="play_button__container"
    @click="playOrganism"
  >
    <audio
      ref="organism"
      :src="organismData"
    />
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
    organismData: {
      type: String,
      default: ''
    }
  },
  data:() => ({
    isPlaying: false
  }),
  mounted() {
    // const audio = new Audio(this.organismData)
    const audio = this.$refs.organism
    audio.onloadedmetadata = data => {
      console.log(data)
      console.log(audio.duration)
      console.log(audio.ended)
    }
    console.log(this.$refs.organism)
  },
  methods: {
    playOrganism() {
      if (this.isPlaying) {
        this.isPlaying = false
        this.$refs.organism.pause()
        return
      }
      this.isPlaying = true
      this.$refs.organism.play()
    }
  }
}
</script>

<style>

</style>
