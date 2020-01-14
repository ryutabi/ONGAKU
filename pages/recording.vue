<template>
  <div>
    <div>
      <h1>Streaming</h1>
      <video
        :srcObject.prop="localStream"
        autoplay
      />
    </div>
    <div class="effect_control__container">
      <input
        id="effector"
        v-model="isActiveEffect"
        type="checkbox"
        @click="effectProcessing()"
      >
      <label for="effector">
        エフェクト
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data:() => ({
    isActiveEffect: false,
    localStream: null,
    audioCtx: null
  }),
  created() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 360,
        height: 240
      },
      audio: true
    })
    .then(stream => {
      this.localStream = stream
    })
  },
  methods: {
    effectProcessing() {
      if (this.isActiveEffect) {
        this.audioCtx.close()
        return
      }

      //AudioContextを生成
      this.audioCtx = new AudioContext()

      //BiquadFilterを生成
      const biquadFilter = this.audioCtx.createBiquadFilter();
      biquadFilter.type = 'highshelf';     // ハイシェルフフィルター
      biquadFilter.frequency.value = 1000; // 周波数閾値
      biquadFilter.gain.value = 100;       // Gain(強さ)

      //getUserMediaで取得したMediaStreamからMediaStreamAudioSourceNodeを生成
      const mediaStreamSource = this.audioCtx.createMediaStreamSource(this.localStream)
      mediaStreamSource.connect(biquadFilter)
      biquadFilter.connect(this.audioCtx.destination)
    },
  }
}
</script>

<style>

</style>