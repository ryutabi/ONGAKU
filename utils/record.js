let mediaRecorder = null

const startRec = stream => {
  const options = { mimeType: 'video/webm' }
  mediaRecorder = new MediaRecorder(stream, options)
  mediaRecorder.start()
}

const stopRec = () => {
  return new Promise(resolve => {
    mediaRecorder.stop()
    mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        const blob = new Blob([e.data], { type: "video/webm" })
        resolve(blob)
      }
    }
  })
}

const record = {
  startRec,
  stopRec
}

export default record
