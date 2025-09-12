import React from 'react'
import MeetingBottomNav from '../../components/UI/MeetingBottomNav'
import { useEffect } from 'react'
import { useSocket } from '../../hooks/Socket'
import { usePeer } from '../../hooks/Peer'
import { useCallback } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'

const CurrentMeeting = () => {
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { peer, createOffer, createAns, createRemoteAnswer, myStream, handleStopTrackEvent, remoteStreamRef, setTrackType, videoTrack, remoteAudioRef, screenMedia, remoteScreenMedia, setScreenTracks } = usePeer()
  const [disableLocalVideo, setDisableLocalVideo] = useState(true);
  const [remoteEmailId, setRemoteEmailId] = useState(null);
  const [fromRemoteEmailId, setFromRemoteEmailId] = useState(null);

console.log(remoteScreenMedia)
  const handleNewUserJoined = useCallback(async ({ emailId }) => {
    alert(`new user joined ${emailId}`)
    const offer = await createOffer()
    socket.emit('call-user', { emailId, offer })
    setRemoteEmailId(emailId)
  }, [createOffer, socket])

  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log('hello incoming call')
    const ans = await createAns(offer, myStream)
    socket.emit('call-accepted', { from, ans })
    setFromRemoteEmailId(from)
  }, [socket])

  const handleAcceptedCall = useCallback(async ({ ans }) => {
    console.log('call got accepted', ans)
    await createRemoteAnswer(ans)
  }, [socket])

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
  }, [peer, remoteEmailId, fromRemoteEmailId, socket]);

  const handleIceCanditate = useCallback((e) => {
    console.log('need to send ice candidate')
    socket.emit('send-candidate', { candidate: e.candidate })
  }, [])
  useEffect(() => {
    if (peer) {
      peer.addEventListener('icecandidate', handleIceCanditate)
      peer.addEventListener('negotiationneeded', handleNegotiation)
    }

    return () => {
      peer?.removeEventListener('negotiationneeded', handleNegotiation)
      peer?.removeEventListener('icecandidate', handleIceCanditate)

    }
  }, [handleNegotiation, peer, handleIceCanditate])

  const handleReceivedCandidate = useCallback(async ({ candidate }) => {
    await peer?.addIceCandidate(candidate)
  }, [peer])


  const handleTrackType = useCallback((type) => {

    setTrackType(type)
  }, [setTrackType])

  useEffect(() => {
    socket.on('user-joined', handleNewUserJoined)
    socket.on('incoming-call', handleIncomingCall)
    socket.on('call-accepted', handleAcceptedCall)
    socket.on('receive-candidate', handleReceivedCandidate)
    socket.on('end-meeting', handleEndMeeting)
    socket.on('track-type', handleTrackType)
    socket.on('track-type-removed', handleStopTrackEvent)
    return () => {
      socket.off('user-joined', handleNewUserJoined)
      socket.off('incoming-call', handleIncomingCall)
      socket.off('call-accepted', handleAcceptedCall)
      socket.off('receive-candidate', handleReceivedCandidate)
      socket.off('end-meeting', handleEndMeeting)
      socket.off('track-type', handleTrackType)
      socket.off('track-type-removed', handleStopTrackEvent)

    }
  }, [socket, handleAcceptedCall, handleIncomingCall, handleNewUserJoined, handleReceivedCandidate])


  const leaveMeeting = useCallback(async () => {
    videoTrack?.stop();
    if (peer) peer.close();
    socket.emit('leave-meeting');
    navigate('/profile')

  }, [videoTrack, peer,socket])

  const handleEndMeeting = useCallback(async () => {
    console.log('hello end meeting')
    if (peer) peer.close();
    navigate('/profile')
  }, [])

  const handleLocalVideo = (disable) => {
    setDisableLocalVideo(disable)
  }



  return (
    <div className='h-full p-10 flex flex-col gap-10 max-sm:p-2'>
      <div className={cn('grid grid-cols-2 items-center justify-center gap-10 h-full overflow-hidden max-sm:flex-col max-sm:gap-2', (screenMedia || remoteScreenMedia) && 'grid-cols-[1fr_2fr] ',
        (remoteScreenMedia && screenMedia) && 'grid-cols-2')}>
        {/* Local Stream Render */}
        <div className="bg-gray-200 border-5 border-blue-800 rounded-4xl  h-full inset-shadow-sm overflow-hidden max-sm:w-full">
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

        {
          (screenMedia && <div className="bg-gray-200 border-5 border-blue-800 rounded-4xl h-full row-span-2 inset-shadow-sm  overflow-hidden max-sm:w-full">
            <video
              ref={(video) => {
                if (video && screenMedia) {
                  video.srcObject = screenMedia;
                }
              }}
              autoPlay
              muted
              playsInline
            />

          </div>)

        }
        {
          (remoteScreenMedia && <div className="bg-gray-200 border-5 border-blue-800 row-span-2 rounded-4xl h-full inset-shadow-sm  overflow-hidden max-sm:w-full">
            <video
              ref={(video) => {
                if (video && remoteScreenMedia) {
                  video.srcObject = remoteScreenMedia;
                }
              }}
              autoPlay
              muted
              playsInline
            />

          </div>)
        }


        {/* RemoteStream Render */}

        <div className="bg-gray-200 border-5 border-blue-800 rounded-4xl h-full inset-shadow-sm  overflow-hidden relative max-sm:w-full">
          <audio ref={remoteAudioRef} autoPlay className='hidden'></audio>
          <video
            ref={remoteStreamRef}
            autoPlay
            playsInline
            className='w-full h-full object-cover'

          />
          {
            remoteEmailId ? <span className='block p-1 rounded-xl text-black bg-white/70 absolute left-4 top-4'>{remoteEmailId}</span> : <span className='block text-black  bg-white/70 absolute p-1 rounded-xl left-4 top-4'>{fromRemoteEmailId}</span>
          }
        </div>




      </div>
      <MeetingBottomNav handleLocalVideo={handleLocalVideo} leaveMeeting={leaveMeeting} />
    </div>
  )
}

export default CurrentMeeting
