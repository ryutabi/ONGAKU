import exportWAV from '~/utils/export_wav.js'

const bufferSize = 2048
let audioData
let sampleRate

const onAudioProcess = e => {
  const input = e.inputBuffer.getChannelData(0)
  const bufferData = new Float32Array(bufferSize)
  for (let i = 0; i < bufferSize; i++) {
    bufferData[i] = input[i]
  }
  audioData.push(bufferData)
}


const startRec = (stream, ctx) => {
  audioData = [] // initialize audioData
  const scriptProcessor = ctx.createScriptProcessor(bufferSize, 1, 1)
  const mediaStreamSource = ctx.createMediaStreamSource(stream)
  sampleRate = ctx.sampleRate
  mediaStreamSource.connect(scriptProcessor)
  scriptProcessor.onaudioprocess = onAudioProcess
  scriptProcessor.connect(ctx.destination)
}

const stopRec = () => {
  return new Promise(resolve => resolve(exportWAV(audioData, sampleRate)))
}

export { startRec, stopRec }
