<template>
  <div class="recording__container">
    <div class="recording_video__container">
      <div v-show="!blobUrl">
        <video
          :srcObject.prop="localStream"
          autoplay
        />
      </div>
      <div v-if="blobUrl">
        <video
          :src="blobUrl"
          width="375"
          height="375"
          autoplay
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
import record from '~/utils/record'
import RecordButton from '~/components/RecordButton'
import EffectBox from '~/components/EffectBox'
import { mapActions } from 'vuex'

const organismStorageRef = storage.ref('organisms')

export default {
  components: {
    RecordButton,
    EffectBox
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
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 375,
        height: 375
      },
      audio: true
    })
    .then(stream => {
      this.localStream = stream
    })
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
      this.audioCtx = new AudioContext()
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
      record.startRec(this.localStream)
    },
    async stopRecording() {
      this.organismData = await record.stopRec()
      this.blobUrl = window.URL.createObjectURL(this.organismData)
      this.localStream = null
      this.uploadOrganism(this.organismData).then(() => {
        console.log('アップ成功！！')
        // 新規投稿画面に遷移
        // this.$router.push('/')
      })
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
  background-color: #000;
  height: 100vh;
}

.recording_video__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.recording_button__container {
  background-color: black;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.effect_box__container {
  display: flex;
  justify-content: space-evenly;
}
</style>
