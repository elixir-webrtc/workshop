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

// Hint: use https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage 
// to send message via BroadcastChannel.
// Hint: use offerToMsg, answerToMsg and candidateEventToMsg
// Example: signaling.postMessage(offerToMsg(offer));

button.onclick = start;

async function start() {
  // 1. create a new peer connection and setup onicecandidate and ontrack events
  // 2. obtain access to the microphone and camera
  // 3. add tracks to the peer connection
  // 4. create offer
  // 5. set it as local description
  // 6. send it to the other side
  // Hint: use offerToMsg
};

function onicecandidate(event) {
  // 1. send received candidate to the other side
  // Hint: use candidateEventToMsg
}

function ontrack(event) {
  // 1. pin remote track to the remote HTML video element
}

async function handleOffer(offer) {
  // 1. create a new peer connection and setup onincecandidate and ontrack callbacks
  // 2. set remote description
  // 3. generate an answer
  // 4. set it as local description
  // 5. send it to the other side
  // Hint: use answerToMsg
}

async function handleAnswer(answer) {
  // 1. set remote description
}

async function handleCandidate(candidate) {
  // 1. add ice candidate to the peer connection
  // Hint: if candidate.candidate is null, pass null to the addIceCandidate function.
  // This indicates there won't be any further candidates and allows ICE to conclude - move from connected to completed state 
}

function offerToMsg(offer) {
  return {
    type: 'offer',
    sdp: offer.sdp
  }
}

function answerToMsg(answer) {
  return {
    type: 'answer',
    sdp: answer.sdp
  }
}

function candidateEventToMsg(event) {
  const message = {
    type: 'candidate',
    candidate: null,
  };

  if (event.candidate) {
    message.candidate = event.candidate.candidate;
    message.sdpMid = event.candidate.sdpMid;
    message.sdpMLineIndex = event.candidate.sdpMlineIndex;
  }

  return message;
}
