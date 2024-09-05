# Obtaining access to audio and video devices

Tasks:
1. Obtain access to default audio and video devices and display them in `<video></video>` HTML element.
Note that `<video></video>` element can also play sound.
Just assign your `MediaStream` object to `video.srcObject`.
1. Set *preferred* resolution to 1280x720.
1. Turn off `echoCancellation`, and turn on `autoGainControl` and `noiseSuppresion`.
1. Set camera resolution to be *exactly* 1280x720.
1. Try different values for camera's width: 444, 555, 8888. 

Hint: see [examples](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#examples).

Questions:
1. What does `min`, `ideal`, `exact`, `max` properties mean? 
1. What does `OverconstrainedError` error mean?

What's next:
1. How to list devices?
1. How to select specific device?

References:
1. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
1. https://webrtc.github.io/samples/src/content/getusermedia/gum/
1. https://webrtc.github.io/samples/src/content/devices/input-output/
