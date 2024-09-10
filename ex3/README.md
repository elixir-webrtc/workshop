# Dumping browser's RTP packets

The following instructions will dump RTP packets sent/received by a web browser in an unecrypted form.
Those packets will be dumped together with other logs and will have `# RTP_DUMP` at the end of each packet.
For example (packet's binary has been truncated for readability):

```
I 12:15:38.309 000000 90 70 5f f3 cd 65 51 fa 4e 5a # RTP_DUMP
```

## Instructions:

1. Run chrome/chromium with logs enabled. 

    ```
    chromium --enable-logging=stderr -v=3 --force-fieldtrials=WebRTC-Debugging-RtpDump/Enabled/ > log.txt 2>&1
    ```

1. Filter RTP packets

    ```
    grep RTP_DUMP log.txt > rtp-dump.txt
    ```

1. Convert RTP packets into pcap file.

    ```
    text2pcap -D -u 5443,62132 -t %H:%M:%S.%f rtp-dump.txt rtp-dump.pcap
    ```

    * `-D` - Indicates that the text before each input packet may start either with an I or O indicating that the packet is inbound or outbound.
    * `-u <srcport>,<destport>` - include dummy UDP headers before each packet
    * `-t <timefmt>` - treats the text before the packet as date/time code  

1. Open pcap with Wireshark

    ```
    wireshark rtp-dump.pcap
    ```
