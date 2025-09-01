import React from 'react'
import MeetingBottomNav from '../../components/UI/MeetingBottomNav'
import { useEffect } from 'react'
import { useSocket } from '../../hooks/Socket'
import { usePeer } from '../../hooks/Peer'
import { useCallback } from 'react'
import { useState } from 'react'


const CurrentMeeting = () => {
  const {socket}=useSocket()
  const {peer,createOffer,createAns,createRemoteAnswer,sendStream,remoteStream,myStream,remoteStreamRef}=usePeer()
 console.log(remoteStream)
  const [remoteEmailId, setRemoteEmailId] = useState(null);
  const [fromRemoteEmailId, setFromRemoteEmailId] = useState(null);

console.log(remoteStreamRef.current?.srcObject)
  const handleNewUserJoined= useCallback( async({emailId})=>{
            alert(`new user joined ${emailId}`)
           await sendStream(myStream)
         const offer= await createOffer()
         socket.emit('call-user',{emailId,offer})
         setRemoteEmailId(emailId)
  },[createOffer,socket])
 
  const handleIncomingCall=useCallback( async({from,offer})=>{
      const ans= await createAns(offer,myStream)
      socket.emit('call-accepted',{from,ans})
      setFromRemoteEmailId(from)
  },[socket]) 

  const handleAcceptedCall=useCallback(async({ans})=>{
    console.log('call got accepted',ans)
    await  createRemoteAnswer(ans)
  },[socket])

  const handleNegotiation =useCallback(()=>{
   const localOffer= peer.localDescription;
   socket.emit('call-user',{emailId:fromRemoteEmailId, offer:localOffer})
  },[peer])

  const handleIceCanditate =useCallback((e)=>{
     console.log('need to send ice candidate')
     socket.emit('send-candidate',{candidate:e.candidate})
  },[])
  useEffect(()=>{
    peer.addEventListener('icecandidate',handleIceCanditate)
   peer.addEventListener('negotiationneeded',handleNegotiation)
   return ()=>{
    peer.removeEventListener('negotiationneeded',handleNegotiation)
    peer.removeEventListener('icecandidate',handleIceCanditate)

   }
  }, [handleNegotiation,peer])

  const handleReceivedCandidate=useCallback(async({candidate})=>{
      await peer.addIceCandidate(candidate)
  })
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



  return (
    <div className='h-full p-10 flex flex-col gap-10'>
    <div className='flex items-center justify-center gap-10 h-full overflow-hidden '>
      <div className=" rounded-4xl h-full inset-shadow-sm w-1/2 overflow-hidden">
   <video
  ref={(video) => {
    if (video && myStream) {
      video.srcObject = myStream;
    }
  }}
  autoPlay
  muted
  playsInline
/>

      </div>
      <div className="bg-gray-100  rounded-4xl h-full inset-shadow-sm w-1/2 overflow-hidden relative">
      <video
  ref={remoteStreamRef}
  autoPlay
  muted
  playsInline
  className='w-full h-full'
/>
      {
        remoteEmailId ?  <span className='block p-2 bg-black/70 absolute left-4 top-4'>{remoteEmailId}</span> :  <span className='block p-2 bg-black/70 absolute left-4 top-4'>{fromRemoteEmailId}</span>
      } 
      </div>
    </div>
    <MeetingBottomNav sendStream={sendStream} myStream={myStream} />
    </div>
  )
}

export default CurrentMeeting
