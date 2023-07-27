import * as FFmpeg from '@ffmpeg/ffmpeg';

export default async function convertWebmToMp3(webmBlob) {
  // console.log(webmBlob)
  const ffmpeg = new FFmpeg.FFmpeg();
  await ffmpeg.load();

  const inputName = 'input.webm';
  const outputName = 'output.mp3';
  console.log(ffmpeg);

  ffmpeg.FS(
    'writeFile',
    inputName,
    await fetch(webmBlob).then((res) => res.arrayBuffer())
  );

  await ffmpeg.run('-i', inputName, outputName);

  const outputData = ffmpeg.FS('readFile', outputName);
  const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });

  return outputBlob;
}
