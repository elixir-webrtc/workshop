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

  // when pc1 or pc2 receives a new ICE candidate, add it on the other side
  pc1.onicecandidate = async ev => await pc2.addIceCandidate(ev.candidate);
  pc2.onicecandidate = async ev => await pc1.addIceCandidate(ev.candidate);

  // when pc2 receives a new track, pin it to the player
  pc2.ontrack = ev => remotePlayer.srcObject = ev.streams[0];

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
