import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/Socket";

export const PeerContext= createContext()

export const PeerProvider=({children})=>{
  let localStream= new MediaStream()
    const [remoteStream, setRemoteStream] = useState(null);
    const [track, setTrack] = useState(null);
    const [videoTrack, setVideoTrack] = useState(null);
    const [audioTrack, setAudioTrack] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [iceServerURLs, setIceServerURLs] = useState(null);
    const remoteStreamRef= useRef(null)
    const remoteAudioRef= useRef(null)
    console.log(iceServerURLs)
    async function getIceServers(){
       try {
         const res= await fetch('https://talktrackr-2.onrender.com/ice-servers')
         const data= await res.json()
         console.log(data)
        setIceServerURLs(data.token.iceServers)
       } catch (error) {
        console.log(error)
       }
    }
    useEffect(()=>{
          getIceServers()
    },[])
   const peer= useMemo(()=>{
    if(iceServerURLs){
        console.log('helloURLs')
    return new RTCPeerConnection({
        iceServers:iceServerURLs,
     })
    }
   },[iceServerURLs])
   
   const createOffer= async()=>{
     const offer= await peer.createOffer()
     console.log(offer)
     await peer.setLocalDescription(offer)
     return offer
   }


const createAns = async (receivedOffer,localStream) => {
  console.log('hello offer')
    await peer.setRemoteDescription(receivedOffer);

    // localStream.getTracks().forEach(track => {
    //     peer.addTrack(track, localStream);
    // });
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer; // Send this back to caller
}


   const createRemoteAnswer= async(ans)=>{
    console.log(ans)
    await peer.setRemoteDescription(ans)
    console.log(peer.remoteDescription,peer.localDescription)
   }

   const sendStream= async()=>{
if(!videoTrack){
      const stream= await navigator.mediaDevices.getUserMedia({video:true})
       setMyStream(stream)
       let videoTrack= stream.getVideoTracks()[0]
        setVideoTrack(videoTrack)
        localStream.addTrack(videoTrack)
         peer.addTrack(videoTrack,localStream)
}
  
   }


   const stopStream= async()=>{

  if(videoTrack){
    videoTrack.stop();
    localStream.removeTrack(videoTrack)
    const sender= peer.getSenders().find(s=> s.track?.kind==='video')
    if(sender){
      peer.removeTrack(sender)
      setVideoTrack(null)
    }
  }
     
   }

      const enableAudio=async()=>{
     if(!audioTrack){
       const stream= await navigator.mediaDevices.getUserMedia({audio:true})
       let audioTrack= stream.getAudioTracks()[0]
       setAudioTrack(audioTrack)
       localStream.addTrack(audioTrack)
       peer.addTrack(audioTrack,localStream)
     }
      
   }

   const stopAudio=()=>{
    if(audioTrack){
      audioTrack.stop()
      localStream.removeTrack(audioTrack)
  const sender= peer.getSenders().find(s=> s.track?.kind==='audio')
  if(sender){
    peer.removeTrack(sender)
    setAudioTrack(null)
  }
   
    }
  }


   const handleTrackEvent= useCallback((e)=>{
   
      if (e.track.kind === "video") {
       remoteStreamRef.current.srcObject = new MediaStream();
    remoteStreamRef.current.srcObject.addTrack(e.track);

  }

   if (e.track.kind==="audio"){
    console.log(remoteAudioRef.current)
    remoteAudioRef.current.srcObject= new MediaStream();
    remoteAudioRef.current.srcObject.addTrack(e.track)
  }
        
   },[])



   useEffect(() => {
   if(peer){
      peer.addEventListener('track',handleTrackEvent)
   }
     return () => {
       peer?.removeEventListener('track',handleTrackEvent)
     }
   }, [peer,handleTrackEvent])

  
   

  
    return(
        <PeerContext.Provider value={{peer,
        createOffer,createAns,
        createRemoteAnswer,
        setMyStream,
        sendStream,
        remoteAudioRef,
        remoteStream,
        myStream,
        remoteStreamRef,
        stopStream,
        stopAudio,
        enableAudio}}>
            {children}
        </PeerContext.Provider>
    )
}