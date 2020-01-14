<template>
  <div>
    <h1>Streaming</h1>
    <video
      width="320"
      height="240"
      :srcObject.prop="localStream"
      autoplay
    />
  </div>
</template>

<script>
export default {
  data:() => ({
    localStream: null
  }),
  created() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    .then(stream => {
      this.localStream = stream
    })
  }
}
</script>

<style>

</style>