let audioContext;
    let processor;
    let input;

    async function startStreaming() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext({ sampleRate: 16000 });
      input = audioContext.createMediaStreamSource(stream);

      processor = audioContext.createScriptProcessor(4096, 1, 1);
      input.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const int16Data = convertFloat32ToInt16(inputData);
        const base64Chunk = arrayBufferToBase64(int16Data.buffer);
        socket.emit("audio_chunk", base64Chunk);
      };

      // Listen for transcripts
      socket.on("transcript", (data) => {
        if (data.message_type === "FinalTranscript") {
          setTranscript((prev) => prev + " " + data.text);
        }
      });
    }