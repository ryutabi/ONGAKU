const encodeWAV = (samples, _sampleRate) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++ , offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  };

  writeString(view, 0, 'RIFF');  // RIFFヘッダ
  view.setUint32(4, 32 + samples.length * 2, true); // これ以降のファイルサイズ
  writeString(view, 8, 'WAVE'); // WAVEヘッダ
  writeString(view, 12, 'fmt '); // fmtチャンク
  view.setUint32(16, 16, true); // fmtチャンクのバイト数
  view.setUint16(20, 1, true); // フォーマットID
  view.setUint16(22, 1, true); // チャンネル数
  view.setUint32(24, _sampleRate, true); // サンプリングレート
  view.setUint32(28, _sampleRate * 2, true); // データ速度
  view.setUint16(32, 2, true); // ブロックサイズ
  view.setUint16(34, 16, true); // サンプルあたりのビット数
  writeString(view, 36, 'data'); // dataチャンク
  view.setUint32(40, samples.length * 2, true); // 波形データのバイト数
  floatTo16BitPCM(view, 44, samples); // 波形データ

  return view
}

const mergeBuffers = _audioData => {
  let sampleLength = 0;
  for (let i = 0; i < _audioData.length; i++) {
    sampleLength += _audioData[i].length;
  }
  let samples = new Float32Array(sampleLength);
  let sampleIdx = 0;
  for (let i = 0; i < _audioData.length; i++) {
    for (let j = 0; j < _audioData[i].length; j++) {
      samples[sampleIdx] = _audioData[i][j];
      sampleIdx++;
    }
  }
  return samples;
}



const exportWAV = (audioData, sampleRate) => {
  const dataView = encodeWAV(mergeBuffers(audioData), sampleRate);
  const audioBlob = new Blob([dataView], { type: 'audio/wav' });
  alert(audioBlob)
  return audioBlob
}

export default exportWAV
