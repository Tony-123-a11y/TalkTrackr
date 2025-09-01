import { Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff } from "lucide-react"
import { useState } from "react"

export default function MeetingBottomNav({myStream,sendStream}) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  return (
    <div className="  w-full bg-gray-200 py-3 shadow-sm rounded-4xl">
      <div className="container flex items-center justify-center gap-6">
        
        {/* Mic Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"
        >
          {isMuted ? <MicOff className="w-6 h-6 text-red-500" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* Video Toggle */}
        <button
          onClick={() =>{ 
            setIsVideoOff(!isVideoOff)
            sendStream(myStream)         
          }}
          className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer"
        >
          {isVideoOff ? <VideoOff className="w-6 h-6 text-red-500" /> : <Video className="w-6 h-6" />}
        </button>

        {/* Screen Share */}
        <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white  cursor-pointer">
          <MonitorUp className="w-6 h-6" />
        </button>

        {/* Leave Call */}
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white cursor-pointer">
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
