# WebRTC monitoring and debugging

Tasks: 
1. Run ex2 and using `chrome://webrtc-internals`, answer the following questions (for both audio and video):
    1. How many packets per second are sent?
    1. What codecs are used?
    1. How many keyframe reuqests were sent?
    1. What is the bitrate?
1. Run web browser with logs and try to find a log informing about receiving the first RTP packet.
1. Dump RTP packets received by a web browser and run them in a wireshark.

References:
1. https://hexdocs.pm/ex_webrtc/debugging.html