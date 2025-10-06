import { Mic, MicOff, Video, VideoOff, MonitorUp, Phone, MonitorOff, Share } from "lucide-react"
import { useState } from "react"
import { usePeer } from "../../hooks/Peer"

export default function MeetingBottomNav({handleLocalVideo,leaveMeeting,setCopyCodeModal}) {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOff, setIsVideoOff] = useState(true)
  const [screenOff, setScreenOff] = useState(true);
  const {sendStream,stopStream,enableAudio,stopAudio,enableScreenShare,stopScreenShare}= usePeer()

  return (
    <div className="  w-full bg-gray-200 py-3 shadow-sm rounded-4xl">
      <div className="container flex items-center justify-center gap-6">
        
        {/* Mic Toggle */}
      
          {isMuted ?
          <button 
           className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"
          onClick={()=>{
            setIsMuted(false)
            enableAudio()
          }}>
          <MicOff className="w-6 h-6 text-red-500" />
          </button>
           :
           <button
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"
           onClick={()=>{
               setIsMuted(true)
               stopAudio()
           }}>
  <Mic className="w-6 h-6" />
           </button>
           
         }
       



        {/* Video Toggle */}
        
          {isVideoOff ?
          <button onClick={() =>{ 
            handleLocalVideo(false)
            setIsVideoOff(false)
            sendStream()         
          }}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"><VideoOff className="w-6 h-6 text-red-500" /></button>
        :
        <button onClick={()=>{
          handleLocalVideo(true)
          setIsVideoOff(true)
              stopStream()
        }} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"> <Video className="w-6 h-6" /></button>
       }
      

        {/* Screen Share */}
        {
          screenOff ?   <button onClick={()=>{
            setScreenOff(false)
            enableScreenShare()
            }} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white max-sm:hidden  cursor-pointer">
          <MonitorOff className="w-6 h-6" />
        </button>
        :
        <button onClick={()=>{
          stopScreenShare()
          setScreenOff(true)
          }} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 max-sm:hidden  text-white  cursor-pointer">
          <MonitorUp className="w-6 h-6" />
        </button>
}
<button onClick={()=>setCopyCodeModal(true)} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white cursor-pointer">
          <Share/>
        </button>

        {/* Leave Call */}
        <button onClick={leaveMeeting} className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white cursor-pointer">
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
