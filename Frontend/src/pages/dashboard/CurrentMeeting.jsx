import React from 'react'
import MeetingBottomNav from '../../components/UI/MeetingBottomNav'
import { useEffect } from 'react'
import { useSocket } from '../../hooks/Socket'
import { usePeer } from '../../hooks/Peer'
import { useCallback } from 'react'
import { useState } from 'react'


const CurrentMeeting = () => {
  const {socket}=useSocket()
  const {peer,createOffer,createAns,createRemoteAnswer,sendStream,remoteStream,myStream,setMyStream,remoteStreamRef,remoteAudioRef,stopStream}=usePeer()
 const [disableLocalVideo, setDisableLocalVideo] = useState(true);
  const [remoteEmailId, setRemoteEmailId] = useState(null);
  const [fromRemoteEmailId, setFromRemoteEmailId] = useState(null);
 

  const handleNewUserJoined= useCallback( async({emailId})=>{
            alert(`new user joined ${emailId}`)
         const offer= await createOffer()
         socket.emit('call-user',{emailId,offer})
         setRemoteEmailId(emailId)
  },[createOffer,socket])
 
  const handleIncomingCall=useCallback( async({from,offer})=>{
    console.log('hello incoming call')
      const ans= await createAns(offer,myStream)
      socket.emit('call-accepted',{from,ans})
      setFromRemoteEmailId(from)
  },[socket]) 

  const handleAcceptedCall=useCallback(async({ans})=>{
    console.log('call got accepted',ans)
    await  createRemoteAnswer(ans)
  },[socket])

const handleNegotiation = useCallback(async () => {
  console.log("negotiation needed");

  try {
    const offer = await peer.createOffer();  
    await peer.setLocalDescription(offer);   

    socket.emit("call-user", {
      emailId: remoteEmailId || fromRemoteEmailId,
      offer: offer, 
    });
  } catch (err) {
    console.error("Error during negotiation:", err);
  }
}, [peer, remoteEmailId,fromRemoteEmailId, socket]);

  const handleIceCanditate =useCallback((e)=>{
     console.log('need to send ice candidate')
     socket.emit('send-candidate',{candidate:e.candidate})
  },[])
  useEffect(()=>{
    if(peer){
      peer.addEventListener('icecandidate',handleIceCanditate)
         peer.addEventListener('negotiationneeded',handleNegotiation)
    }

   return ()=>{
    peer?.removeEventListener('negotiationneeded',handleNegotiation)
    peer?.removeEventListener('icecandidate',handleIceCanditate)

   }
  }, [handleNegotiation,peer,handleIceCanditate])

  const handleReceivedCandidate=useCallback(async({candidate})=>{
      await peer?.addIceCandidate(candidate)
  },[peer])

  useEffect(()=>{
    socket.on('user-joined',handleNewUserJoined)
    socket.on('incoming-call',handleIncomingCall)
    socket.on('call-accepted',handleAcceptedCall)
    socket.on('receive-candidate',handleReceivedCandidate)
    return ()=>{
      socket.off('user-joined',handleNewUserJoined)
    socket.off('incoming-call',handleIncomingCall)
    socket.off('call-accepted',handleAcceptedCall)
    socket.off('receive-candidate',handleReceivedCandidate)

    }
  },[socket,handleAcceptedCall,handleIncomingCall,handleNewUserJoined,handleReceivedCandidate])
    



  const handleLocalVideo=(disable)=>{
    setDisableLocalVideo(disable)
  }



  return (
    <div className='h-full p-10 flex flex-col gap-10 max-sm:p-2'>
    <div className='flex items-center justify-center gap-10 h-full overflow-hidden max-sm:flex-col max-sm:gap-2'>
      <div className="bg-black rounded-4xl h-full inset-shadow-sm w-1/2 overflow-hidden max-sm:w-full">
   <video
  ref={(video) => {
    if (video && myStream && !disableLocalVideo) {
      video.srcObject = myStream;
    }
  }}
  autoPlay
  muted
  playsInline
/>

      </div>
      <div className="bg-black  rounded-4xl h-full inset-shadow-sm w-1/2 overflow-hidden relative max-sm:w-full">
      <audio ref={remoteAudioRef} autoPlay className='hidden'></audio>
      <video
  ref={remoteStreamRef}
  autoPlay
  playsInline
  className='w-full h-full object-cover'

/>
      {
        remoteEmailId ?  <span className='block p-1 rounded-xl text-black bg-white/70 absolute left-4 top-4'>{remoteEmailId}</span> :  <span className='block text-black  bg-white/70 absolute p-1 rounded-xl left-4 top-4'>{fromRemoteEmailId}</span>
      } 
      </div>
    </div>
    <MeetingBottomNav handleLocalVideo={handleLocalVideo}/>
    </div>
  )
}

export default CurrentMeeting
