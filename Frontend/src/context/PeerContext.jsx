import { useCallback, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/Socket";

export const PeerContext= createContext()

export const PeerProvider=({children})=>{
    const [remoteStream, setRemoteStream] = useState(null);
    const [myStream, setMyStream] = useState(null);
   const peer= useMemo(()=>{
    return new RTCPeerConnection({
        iceServers:[
            {
                urls:[ 
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                 
                ]
            }
        ]
     })
   },[])
   
   const createOffer= async()=>{
     const offer= peer.createOffer()
     await peer.setLocalDescription(offer)
     return offer
   }

async function createAns( remoteOffer, localStream) {
  // STEP 1: Pre-add transceivers with same media types & order
  peer.addTransceiver("audio", { direction: "sendrecv" });
  peer.addTransceiver("video", { direction: "sendrecv" });

  // STEP 2: Attach local tracks
  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  // STEP 3: Set remote description (the offer)
  await peer.setRemoteDescription(remoteOffer);

  // STEP 4: Create and set local answer
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  return answer; // send back to the offerer
}


   const createRemoteAnswer= async(ans)=>{
    console.log(ans)
    await peer.setRemoteDescription(ans)
   }

   const sendStream= async(stream)=>{


       const tracks= stream.getTracks()
       for(const track of tracks){
        peer.addTrack(track,stream)
       }

 
   }

   const handleTrackEvent= useCallback((e)=>{
    console.log('hello track')
        const stream= e.streams;
        console.log(stream)
        setRemoteStream(stream[0])
   },[])

   useEffect(() => {
     peer.addEventListener('track',handleTrackEvent)
     return () => {
       peer.removeEventListener('track',handleTrackEvent)
     }
   }, [peer,handleTrackEvent])
   
  const getUserMediaStream= useCallback(async()=>{
       const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true})
       setMyStream(stream)
  },[myStream])



  useEffect(()=>{
     getUserMediaStream()
},[])
  
    return(
        <PeerContext.Provider value={{peer,createOffer,createAns,createRemoteAnswer,sendStream,remoteStream,myStream}}>
            {children}
        </PeerContext.Provider>
    )
}