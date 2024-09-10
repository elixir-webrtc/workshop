const localPlayer = document.getElementById('localPlayer');
const remotePlayer = document.getElementById('remotePlayer');
(async function () {
  // obtain access to the user's audio and video
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });

  // pin the stream to the localPlayer
  localPlayer.srcObject = stream;

  // create two peer connections
  const pc1 = new RTCPeerConnection();
  const pc2 = new RTCPeerConnection();

  // add tracks to pc1
  stream.getTracks().forEach(track => pc1.addTrack(track, stream));

  // create and set offer
  const offer = await pc1.createOffer();
  await pc1.setLocalDescription(offer);

  // set offer on the other side
  await pc2.setRemoteDescription(offer);

  // create and set answer
  const answer = await pc2.createAnswer();
  await pc2.setLocalDescription(answer);

  // set answer on the other side
  await pc1.setRemoteDescription(answer);
})();
