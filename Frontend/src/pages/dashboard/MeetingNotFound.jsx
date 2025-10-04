import React, { useState } from 'react'
import Button from '../../components/UI/Button'
import {Loader2, Video} from 'lucide-react'
import { createNewMeeting } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MeetingNotFound = ({ code, onBack }) => {
  const {user}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  function generateRoomCode(length = 8) {
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
  const res=await createNewMeeting(roomCode,user.emailId)
  setLoading(false)
  navigate(`/profile/currentMeeting/${roomCode}`)


} catch (error) {
  console.log(error.message)
}
}
  return (
   <div className="h-full  text-white flex items-center justify-center">
<div className=" p-8  max-w-2xl text-center">
<div className="inline-block  p-12 rounded-2xl   ">
{/* Large icon */}
<div className="mb-6 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-40 h-40 text-white opacity-95 max-sm:w-32 max-sm:h-32" fill="none" stroke="currentColor" strokeWidth="1.5">
<path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 12.33a2 2 0 000 2.83l5.66 5.66a2 2 0 002.83 0l8.47-8.47a2 2 0 000-2.83L13.12 3.86a2 2 0 00-2.83 0z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6" />
</svg>
</div>


{/* Message */}
<h1 className="mb-3 text-3xl font-semibold tracking-tight max-sm:text-3xl capitalize">No meeting found</h1>
<p className="mb-6  text-white/80">{code ? `We couldn't find a meeting with the code "${code}".` : "We couldn't find a meeting with this code."}</p>


{/* Actions */}
<div className="flex items-center justify-center gap-4">
 <Button
         onClick={()=>navigate('/profile')}
          className={'py-5  shadow-xl bg-white/10 hover:bg-white/20 text-white'}  size={'lg'}>
             Go Back
          </Button>


 <Button
          onClick={createMeeting}
          className={'py-5  shadow-xl  text-white'} size={'lg'}>
            {
              loading ? <Loader2 className='animate-spin' size={25}/>:  <Video  size={25}/>
            }
           
            Create meeting
          </Button>

</div>
</div>


{/* Helpful hint */}
<p className="mt-6 text-sm text-white/60">Tip: double-check the code and try again or create a new meeting.</p>
</div>
</div>
  )
}

export default MeetingNotFound