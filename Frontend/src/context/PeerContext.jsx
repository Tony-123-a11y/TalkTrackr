import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/Socket";

export const PeerContext = createContext()

export const PeerProvider = ({ children }) => {
  let localStream = new MediaStream()
  const { socket } = useSocket()
  const [remoteStream, setRemoteStream] = useState(null);
  const [screenTracks, setScreenTracks] = useState(null);
  const [remoteScreenMedia, setRemoteScreenMedia] = useState(null);
  const [trackType, setTrackType] = useState(null);
  const [screenMedia, setScreenMedia] = useState(null);
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [iceServerURLs, setIceServerURLs] = useState(null);
  const remoteStreamRef = useRef(null)
  const remoteAudioRef = useRef(null)

  async function getIceServers() {
    try {
       const res= await fetch('https://talktrackr-1.onrender.com/ice-servers')
      // const res = await fetch('http://localhost:8000/ice-servers')
      const data = await res.json()
      console.log(data)
      setIceServerURLs(data.token.iceServers)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getIceServers()
  }, [])
  const peer = useMemo(() => {
    if (iceServerURLs) {
      console.log('helloURLs')
      return new RTCPeerConnection({
        iceServers: iceServerURLs,
      })
    }
  }, [iceServerURLs])

  const createOffer = async () => {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    return offer
  }


  const createAns = async (receivedOffer, localStream) => {
    console.log('hello offer')
    await peer.setRemoteDescription(receivedOffer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  }


  const createRemoteAnswer = async (ans) => {
    await peer.setRemoteDescription(ans)
    console.log(peer.remoteDescription, peer.localDescription)
  }


  //Send Video Stream

  const sendStream = async () => {
    if (!videoTrack) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setMyStream(stream)
      let videoTrack = stream.getVideoTracks()[0]
      setVideoTrack(videoTrack)
      localStream.addTrack(videoTrack)
      peer.addTrack(videoTrack, localStream)
      socket.emit('track-added', { type: 'camera' })
    }

  }

  //Stop video stream


  const stopStream = async () => {

    if (videoTrack) {
      videoTrack.stop();
      localStream.removeTrack(videoTrack)
      const sender = peer.getSenders().find(s => s.track?.kind === 'video')
      if (sender) {
        peer.removeTrack(sender)
        setVideoTrack(null)
        socket.emit('track-removed', {stopTrackType:'camera'})
      }
    }

  }

  //Enable audio

  const enableAudio = async () => {
    if (!audioTrack) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      let audioTrack = stream.getAudioTracks()[0]
      setAudioTrack(audioTrack)
      localStream.addTrack(audioTrack)
      peer.addTrack(audioTrack, localStream)
      socket.emit('track-added', { type: 'mic' })

    }

  }

  //Disable Audio

  const stopAudio = () => {
    if (audioTrack) {
      audioTrack.stop()
      localStream.removeTrack(audioTrack)
      const sender = peer.getSenders().find(s => s.track?.kind === 'audio')
      if (sender) {
        peer.removeTrack(sender)
        setAudioTrack(null)
        socket.emit('track-removed', {stopTrackType:'mic'})

      }

    }
  }

  //Enable Screen Share

  const enableScreenShare = useCallback(async () => {
    const screenMedia = await navigator.mediaDevices.getDisplayMedia({ video: true })
    setScreenMedia(screenMedia)
    const screenTracks = screenMedia.getVideoTracks()[0]
    setScreenTracks(screenTracks)
    localStream.addTrack(screenTracks)
    peer.addTrack(screenTracks, localStream)
    socket.emit('track-added', { type: 'screen' })

  })

  const stopScreenShare = useCallback(async () => {

    if (screenTracks) {
         console.log('hello stop screen share')
      screenTracks.stop();
      localStream.removeTrack(screenTracks);
      const sender = peer.getSenders().find(s => s.track?.kind === 'video')
      if (sender) {
        console.log('hello sender')
        peer.removeTrack(sender)
        setScreenTracks(null);
        setScreenMedia(null)
        socket.emit('track-removed', {stopTrackType:'screen'})

      }
    }
  }, [peer, screenTracks])

  const handleTrackEvent = useCallback((e) => {
    if (e.track.kind === "video" && trackType === "camera") {
      remoteStreamRef.current.srcObject = new MediaStream();
      remoteStreamRef.current.srcObject.addTrack(e.track);

    }

    if (e.track.kind === "audio" && trackType === "mic") {
      remoteAudioRef.current.srcObject = new MediaStream();
      remoteAudioRef.current.srcObject.addTrack(e.track)
    }


    if (e.track.kind === "video" && trackType === "screen") {
      let mediaStream = new MediaStream()
      mediaStream.addTrack(e.track)
      setRemoteScreenMedia(mediaStream)
    }
  }, [trackType])

  const handleStopTrackEvent = useCallback((stopTrackType) => {
    console.log(stopTrackType)
    if ( stopTrackType === "camera") {
      remoteStreamRef.current.srcObject = null;

    }

    if ( stopTrackType === "mic") {
      remoteAudioRef.current.srcObject = null;
   
    }


    if (stopTrackType === "screen") {
      setRemoteScreenMedia(null)
    }
  }, [])




  useEffect(() => {
    if (peer) {
      peer.addEventListener('track', handleTrackEvent)
    }
    return () => {
      peer?.removeEventListener('track', handleTrackEvent)
        
    }
  }, [peer, handleTrackEvent])





  return (
    <PeerContext.Provider value={{
      peer,
      createOffer, createAns,
      createRemoteAnswer,
      setMyStream,
      sendStream,
      remoteAudioRef,
      handleStopTrackEvent,
      remoteStream,
      enableScreenShare,
      myStream,
      videoTrack,
      setTrackType,
      remoteStreamRef,
      audioTrack,
      screenTracks,
      stopScreenShare,
      stopStream,
      setScreenTracks,
      screenMedia,
      remoteScreenMedia,
      stopAudio,
      enableAudio
    }}>
      {children}
    </PeerContext.Provider>
  )
}