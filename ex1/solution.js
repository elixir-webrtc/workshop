(async function () {
  const player = document.getElementById('player');

  // preffered width and height - 1280 x 720
  // echoCancellation off, autoGainControl and noiseSuppresion on
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 1280,
      height: 720
    },
    audio: {
      echoCancellation: false,
      autoGainControl: true,
      noiseSuppression: true,
    },
  });

  player.srcObject = stream;
})();