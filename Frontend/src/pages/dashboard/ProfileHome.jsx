import React, { useContext, useState } from 'react'
import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import { useSocket } from '../../hooks/Socket'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'


const ProfileHome = () => {
  const [emailId, setEmailId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const navigate= useNavigate()
const {socket}= useSocket()

const handleJoinedRoom=useCallback( (roomId)=>{
  alert(`room joined ${roomId}`)
  navigate('/profile/currentmeeting')
},[navigate])

  useEffect(()=>{
  socket.on('joined-room',handleJoinedRoom)
  return ()=> {
   socket.off('joined-room',handleJoinedRoom)
  }
  },[socket])


  const handleSubmit= async()=>{
    if(!emailId || !roomId){
      return alert('Please enter EmailID and RoomID for joining a room')
    }
    socket.emit('join-room',{emailId,roomId})
  }
  return (
  <div className=" flex  flex-col items-center justify-center h-full  px-4">
      <div className="text-center max-w-2xl">
        {/* Heading */}
        <h1 className="text-5xl  font-semibold text-gray-900 mb-4 max-sm:text-3xl">
          Video calls and meetings <br /> for everyone
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect, collaborate, and celebrate from <br className="max-sm:hidden" />
          anywhere with Google Meet
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 max-sm:flex-col">
          {/* New Meeting Button */}
          {/* <Button>
            <Video  size={20}/>
            New meeting
          </Button> */}

          {/* Input + Join */}
          <div className="flex items-center  rounded-full relative">
           
            <Input
              type="text"
              onChange={(e)=> setEmailId(e.target.value)}
              placeholder="Enter email"
              variant={'outline'}
            />
          </div>
          <div className="flex items-center  rounded-full relative">
            
            <Input
              type="text"
              onChange={(e)=> setRoomId(e.target.value)}
              placeholder="Enter a code or link"
              variant={'outline'}
            />
            <Button variant={'icon'} onClick={handleSubmit} className={'hover:text-primary cursor-pointer'}>Join</Button>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default ProfileHome
