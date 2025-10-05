import { useState } from 'react'
import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import { useSocket } from '../../hooks/Socket'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import {Loader, Loader2, Video} from 'lucide-react'
import { useSelector } from 'react-redux'
import { createNewMeeting } from '../../services/apiService'
// import Loader from '../../components/UI/Loader'


const ProfileHome = () => {
  const {user}= useSelector((state)=>state.user)
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const navigate= useNavigate()
const {socket}= useSocket()



function generateRoomCode(length = 8) {
  // Create random bytes and convert to base36 (0-9a-z)
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(x => (x % 36).toString(36))
    .join('')
    .toUpperCase();
}

const createMeeting =async()=>{
try {
    const roomCode= generateRoomCode()
  if(!roomCode || !user){
      return alert('Failed to generate room code or fetching user') 
  }
  setLoading(true)
  await createNewMeeting(roomCode,user.emailId)
  setLoading(false)
  navigate(`/profile/currentMeeting/${roomCode}`)

} catch (error) {
  console.log(error.message)
  setLoading(false)
}
}
  const handleSubmit= async()=>{
    if(!user || !roomId){
      return alert('Please enter  RoomCode for joining a room')
    }
  navigate(`/profile/currentMeeting/${roomId}`)
    
  }
  return (
  <div className=" flex  flex-col items-center justify-center  h-full  px-4">
      <div className="text-center max-w-2xl max-sm:text-left max-sm:mb-17">
        {/* Heading */}
        <h1 className="text-5xl  font-semibold leading-13 text-gray-100 capitalize mb-4 max-sm:mb-6 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8">
          Create a call or join an exisiting one 
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-md:text-xl">
          Connect, Record, and take notes 
          with <span className='text-primary font-bold'>Gen AI</span>
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 ">
          <Button
          onClick={createMeeting}
          className={'py-5  shadow-xl relative  text-white'} size={'lg'}>
            {
              loading ? <Loader2 className='animate-spin' size={25}/>:  <Video  size={25}/>
            }
           
            New Call
          </Button>

          
         
          <div className="flex items-center gap-2 rounded-full relative">
            
            <Input
              type="text"
              onChange={(e)=> setRoomId(e.target.value)}
              placeholder="Enter room code"
              variant={'outline'}
              className="bg-gray-50 py-5 text-sm"
            />
            <Button variant={'icon'} onClick={handleSubmit} className={'hover:text-primary  text-gray-100 cursor-pointer'}>Join</Button>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default ProfileHome
