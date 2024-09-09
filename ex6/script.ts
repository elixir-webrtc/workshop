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

////////////////////////////////////////////////////////////////////////////////
// 0. Paste your personal Fishjam Cloud token here                            //
const FISHJAM_CLOUD_TOKEN = '...';                                            //
////////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////
  // YOUR TURN:
  // 1. Create a new FishjamClient object to interact with Fishjam
  // Hint: For the types, you can have a peek at the argument passed to `startStream` :)

  // 2. Using the client, connect to the Fishjam server
  // Hint: use `token` and `url` from above

  // 3. Setup the `joined` and `trackReady` callbacks.
  // The functions below contain more guidelines

  // [OPTIONAL] 4. Once you have everything up to this point working, setup the `trackRemoved` callback
}

async function startStream(client: FishjamClient<PeerMetadata, TrackMetadata>) {
  // 1. Obtain access to webcam stream
  //    You can request video only (no audio) for this example

  // 2. Set the stream as the source for `localPlayer`

  // 3. Tell `client` that you would like to **add the track** present in this stream
}

function onTrackReady(ctx: TrackContext<PeerMetadata, TrackMetadata>) {
  // 1. Create a new video element to display the received stream
  //    Make sure to set the properties `autoplay` and `muted` to `true`
  //    (Chrome blocks autoplay of unmuted video)

  // 2. Assign the media stream from `ctx` to the new element

  // 3. Add the video element to the `remotePlayers` object to display it

  // Hint: check the references in `README.md` if you get stuck
}

function onTrackRemoved(ctx: TrackContext<PeerMetadata, TrackMetadata>) {
  // [OPTIONAL] Implement some way to delete the matching video element...
}
