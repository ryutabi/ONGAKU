let mediaRecorder = null

const startRec = stream => {
  mediaRecorder = new MediaStreamRecorder(stream)
  mediaRecorder.mimeType = 'video/mp4'
  mediaRecorder.start()
}

const stopRec = () => {
  return new Promise(resolve => {
    mediaRecorder.stop()
    mediaRecorder.ondataavailable = blob => {
      resolve(blob)
    }
  })
}

const record = {
  startRec,
  stopRec
}

export default record
