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
import { mapState, mapActions } from 'vuex'
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
  computed: {
    ...mapState({
      playingOrganisms: store => store.organism.organisms.length
    }),
    isLimitPlaying() {
      return this.playingOrganisms >= 4 ? true : false
    }
  },
  methods: {
    ...mapActions('organism', ['setOrganism', 'resetOrganism']),
    playOrganism() {
      if (this.isPlaying) {
        this.pauseOrganism()
        return
      }

      if (this.isLimitPlaying) {
        alert('Mixing organisms is already maximum count!!')
        return
      }

      this.isPlaying = true
      this.setOrganism(this.organismData)
      this.$refs.organism.play()
    },
    pauseOrganism() {
      this.isPlaying = false
      this.resetOrganism(this.organismData)
      this.$refs.organism.pause()
    }
  }
}
</script>

<style>

</style>
