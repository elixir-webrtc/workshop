import { FishjamClient, TrackContext } from '@fishjam-cloud/ts-client';

const roomNameInput = document.getElementById('roomName')! as HTMLInputElement;
const usernameInput = document.getElementById('username')! as HTMLInputElement;
const button = document.getElementById('button')!;
const localPlayer = document.getElementById('localPlayer')! as HTMLVideoElement;
const remotePlayers = document.getElementById('remotePlayers')!;

button.onclick = connect;

// Example metadata types for peer and track
// You can define your own metadata types, just make sure they are serializable
type PeerMetadata = {
  name: string;
};

type TrackMetadata = {
  type: 'camera' | 'screen';
};

// Paste your personal Fishjam Cloud token here
const FISHJAM_CLOUD_TOKEN = '...';

async function connect() {
  const roomName = `${roomNameInput.value}`;
  const username = `${usernameInput.value}`;

  if (roomName === '' || username === '') {
    return console.error("Error: Room name and username cannot be empty");
  }

  // This is where the magic happens: this request makes Fishjam Cloud's RoomManager
  // generate a token (peer token) which you can use to join the room.
  //
  // Note that RoomManager can only be used for development and testing purposes -
  // if you want to deploy your application on Fishjam Cloud, you'll have to
  // implement room and peer token management in your backend.
  const response = await fetch(
    `https://fishjam.io/api/v1/connect/${FISHJAM_CLOUD_TOKEN}/room-manager/${roomName}/users/${username}`
  );

  if (response.status !== 200) {
    return console.error("Error: failed to create peer token", response);
  }

  // Retrieve the token and room URL from the response
  const { token: token, url: url } = await response.json();
  console.log(`Generated peer token for user ${username}, room ${roomName}`);

  const client = new FishjamClient<PeerMetadata, TrackMetadata>();

  client.connect({
    peerMetadata: { name: username }, // optional
    token: token,
    url: url,
  });

  client.on('joined', (_peerId, _peersInRoom) => {
    startStream(client);
  });

  client.on('trackReady', onTrackReady);
  client.on('trackRemoved', onTrackRemoved);
}

// For this example, we'll use video tracks only
async function startStream(client: FishjamClient<PeerMetadata, TrackMetadata>) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true
  });

  localPlayer.srcObject = stream;
  stream.getTracks().forEach((track) => client.addTrack(track, { type: 'camera' }));
}

function onTrackReady(ctx: TrackContext<PeerMetadata, TrackMetadata>) {
  const peerId = ctx.endpoint.id;
  document.getElementById(peerId)?.remove(); // remove previous video element if it exists

  const videoPlayer = document.createElement('video');
  videoPlayer.id = peerId;
  videoPlayer.oncanplaythrough = function () {
    // Chrome blocks autoplay of unmuted video
    videoPlayer.muted = true;
    videoPlayer.play();
  };
  remotePlayers.appendChild(videoPlayer);

  videoPlayer.srcObject = ctx.stream;
}

function onTrackRemoved(ctx: TrackContext<PeerMetadata, TrackMetadata>) {
  const peerId = ctx.endpoint.id;
  document.getElementById(peerId)?.remove();
}
