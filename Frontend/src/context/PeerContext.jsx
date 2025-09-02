import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/Socket";

export const PeerContext= createContext()

export const PeerProvider=({children})=>{
    const [remoteStream, setRemoteStream] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [iceServerURLs, setIceServerURLs] = useState(null);
    const remoteStreamRef= useRef(null)
    console.log(iceServerURLs)
    async function getIceServers(){
       try {
         const res= await fetch('http://localhost:8000/ice-servers')
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
     await peer.setLocalDescription(offer)
     return offer
   }

const createAns = async (receivedOffer,localStream) => {
    await peer.setRemoteDescription(receivedOffer);

    localStream.getTracks().forEach(track => {
        peer.addTrack(track, localStream);
    });
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer; // Send this back to caller
}


   const createRemoteAnswer= async(ans)=>{
    console.log(ans)
    await peer.setRemoteDescription(ans)
    console.log(peer.remoteDescription,peer.localDescription)
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
        remoteStreamRef.current.srcObject=stream[0]
        setRemoteStream(stream[0])
   },[])

   useEffect(() => {
   if(peer){
      peer.addEventListener('track',handleTrackEvent)
   }
     return () => {
       peer?.removeEventListener('track',handleTrackEvent)
     }
   }, [peer,handleTrackEvent])
   
  const getUserMediaStream= useCallback(async()=>{
       const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true})
         setMyStream(stream)
  },[])



  useEffect(()=>{
     getUserMediaStream()
},[])
  
    return(
        <PeerContext.Provider value={{peer,createOffer,createAns,createRemoteAnswer,sendStream,remoteStream,myStream,remoteStreamRef}}>
            {children}
        </PeerContext.Provider>
    )
}