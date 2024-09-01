let pc;

const button = document.getElementById('button');
const localPlayer = document.getElementById('localPlayer');
const remotePlayer = document.getElementById('remotePlayer');

const signaling = new BroadcastChannel('webrtc');
signaling.onmessage = e => {
  switch (e.data.type) {
    case 'offer':
      handleOffer(e.data);
      break;
    case 'answer':
      handleAnswer(e.data);
      break;
    case 'candidate':
      handleCandidate(e.data);
      break;
  }
}

button.onclick = start;

function init() {
  localPlayer.srcObject = null;
  remotePlayer.srcObject = null;
  pc = new RTCPeerConnection();
  pc.onicecandidate = onicecandidate;
  pc.ontrack = ontrack;
}

async function start() {
  init();
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  });
  localPlayer.srcObject = stream;
  stream.getTracks().forEach(track => pc.addTrack(track, stream));
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  signaling.postMessage({
    type: 'offer',
    sdp: offer.sdp
  })
};

function onicecandidate(event) {
  const message = {
    type: 'candidate',
    candidate: null,
  };

  if (event.candidate) {
    message.candidate = event.candidate.candidate;
    message.sdpMid = event.candidate.sdpMid;
    message.sdpMLineIndex = event.candidate.sdpMlineIndex;
  }

  signaling.postMessage(message);
}

function ontrack(event) {
  remotePlayer.srcObject = event.streams[0];
}

async function handleOffer(offer) {
  init();
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  signaling.postMessage({
    type: 'answer',
    sdp: answer.sdp
  });
}

async function handleAnswer(answer) {
  await pc.setRemoteDescription(answer);
}

async function handleCandidate(candidate) {
  if (!candidate.candidate) {
    // null indicates there won't be any further candidates and allows ICE to conclude - move from connected to completed state
    await pc.addIceCandidate(null);
  } else {
    await pc.addIceCandidate(candidate);
  }
}