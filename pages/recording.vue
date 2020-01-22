<template>
  <div class="recording__container">
    <div class="recording_video__container">
      <div v-show="!blobUrl">
        <video
          :srcObject.prop="localStream"
          width="375"
          height="375"
          autoplay
          playsinline="true"
        />
      </div>
      <div v-if="blobUrl">
        <audio
          :src="blobUrl"
          controls
        />
      </div>
    </div>
    <div class="effect_box__container">
      <effect-box
        :is-active="isActiveEffect"
        effect-label="Destortion"
        @click="effectProcessing"
      />
    </div>
    <div class="recording_button__container">
      <record-button
        :is-active="isRecorded"
        @click="handleRecord"
      />
    </div>
  </div>
</template>

<script>
import { storage } from '~/plugins/firebase'
import { startRec, stopRec } from '~/utils/record'
import RecordButton from '~/components/RecordButton'
import EffectBox from '~/components/EffectBox'
import { mapActions } from 'vuex'

const organismStorageRef = storage.ref('organisms')

export default {
  layout: 'blank',
  components: {
    RecordButton,
    EffectBox
  },
  head: {
    script: [
      { src: 'https://cdn.webrtc-experiment.com/MediaStreamRecorder.js' }
    ]
  },
  data:() => ({
    isRecorded: false,
    isActiveEffect: false,
    localStream: null,
    organismData: null,
    audioCtx: null,
    blobUrl: null
  }),
  created() {
    if (!navigator.mediaDevices) {
      alert("Media device is not supported")
      return
    }

    window.AudioContext = window.AudioContext || window.webkitAudioContext

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then(stream => {
      this.localStream = stream
      this.audioCtx = new AudioContext()
    })
    .catch(e => {
      alert(e)
    })
  },
  beforeDestroy() {
    this.localStream.getAudioTracks().forEach(track => track.stop())
  },
  methods: {
    ...mapActions('post', ['addPostId', 'addOrganismUrl']),
    effectProcessing() {
      if (this.isActiveEffect) {
        this.audioCtx.close()
        this.isActiveEffect = false
        return
      }

      this.isActiveEffect = true
      const biquadFilter = this.audioCtx.createBiquadFilter();
      biquadFilter.type = 'highshelf';     // ハイシェルフフィルター
      biquadFilter.frequency.value = 1000; // 周波数閾値
      biquadFilter.gain.value = 100;       // Gain(強さ)

      const mediaStreamSource = this.audioCtx.createMediaStreamSource(this.localStream)
      mediaStreamSource.connect(biquadFilter)
      biquadFilter.connect(this.audioCtx.destination)
    },
    handleRecord() {
      if (this.isRecorded) {
        this.stopRecording()
        return
      }

      this.startRecording()
      this.isRecorded = true
    },
    startRecording() {
      startRec(this.localStream, this.audioCtx)
    },
    async stopRecording() {
      this.organismData = await stopRec()
      this.blobUrl = window.URL.createObjectURL(this.organismData)
      console.log(this.organismData)
      // this.uploadOrganism(this.organismData).then(() => {
      //   console.log('アップ成功！！')
      //   // 新規投稿画面に遷移
      //   this.$router.push('/posts/new')
      // })
    },
    async uploadOrganism(data) {
      // id: 現在時刻のミリ秒表記
      const id = String(new Date().getTime())
      const organismRef = organismStorageRef.child(id)
      await organismRef.put(data).then(snapshot => {
        console.log(`added firebase storage: ${snapshot.state}!!`)
      })
      await organismRef.getDownloadURL().then(url => {
        this.addPostId(id)
        this.addOrganismUrl(url)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recording__container {
  background-color: $bg-black;
  height: 100vh;
}

.recording_video__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.recording_button__container {
  background-color: $bg-black;
  width: 100%;
  padding-bottom: 5rem;
  position: fixed;
  bottom: 0;
}

.effect_box__container {
  display: flex;
  justify-content: space-evenly;
}
</style>
