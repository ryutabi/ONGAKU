<template>
  <div>
    <div v-show="!blobUrl">
      <h1>Streaming</h1>
      <video
        :srcObject.prop="localStream"
        autoplay
      />
    </div>
    <div v-if="blobUrl">
      <h1>PlayBack</h1>
      <video
        :src="blobUrl"
        width="375"
        height="500"
        autoplay
        controls
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
    <div class="recording__container">
      <button @click="startRecording()">
        START
      </button>
      <button @click="stopRecording()">
        STOP
      </button>
    </div>
    <div class="container">
      <record-button />
    </div>
  </div>
</template>

<script>
import record from '~/utils/record'
import RecordButton from '~/components/RecordButton'

export default {
  components: {
    RecordButton
  },
  data:() => ({
    isActiveEffect: false,
    localStream: null,
    audioCtx: null,
    blobUrl: null
  }),
  created() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 375,
        height: 500
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

      this.audioCtx = new AudioContext()
      const biquadFilter = this.audioCtx.createBiquadFilter();
      biquadFilter.type = 'highshelf';     // ハイシェルフフィルター
      biquadFilter.frequency.value = 1000; // 周波数閾値
      biquadFilter.gain.value = 100;       // Gain(強さ)

      const mediaStreamSource = this.audioCtx.createMediaStreamSource(this.localStream)
      mediaStreamSource.connect(biquadFilter)
      biquadFilter.connect(this.audioCtx.destination)
    },
    startRecording() {
      record.startRec(this.localStream)
    },
    async stopRecording() {
      const res = await record.stopRec()
      this.blobUrl = window.URL.createObjectURL(res)
      this.localStream = null
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: black;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
