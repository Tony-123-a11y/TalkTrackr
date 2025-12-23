
import { useState } from "react"
import { Send, Phone, Video, MoreVertical, Smile, Loader2 } from "lucide-react"
import { useParams } from "react-router-dom"
import { getMessages, sendMessageToFriend } from "../../services/apiService"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import EmojiPicker from 'emoji-picker-react';
import { useSocket } from "../../hooks/Socket"

export default function ChatWindow() {
  const { chatId, friendId,friendName,friendProfilePic } = useParams()
  const [inputValue, setInputValue] = useState("")
  const queryClient = useQueryClient()
  const messageEndRef = useRef(null)
  const [emojiPicker, setEmojiPicker] = useState(false);
  const {user}= useSelector((state)=>state.user)
  const {socket}= useSocket()
 
  const messageTime=(timeStamp)=>{
    const time= new Date(timeStamp).toLocaleString({
        dateStyle: "medium",
  timeStyle: "short",
    })
    return time
  }
  
  const {data:messages=[], isLoading, isError } = useQuery({
    queryKey: ['messages',chatId],
    queryFn: async () => (await getMessages(chatId)).data.conversation.messages
  })



  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  const sendMessageMutation = useMutation({
    mutationFn: ({ friendId, text }) =>
      sendMessageToFriend(friendId, text),

    onSuccess: () => {
      // refetch messages after sending
      queryClient.invalidateQueries(['messages', chatId])
    },
  })
  const sendLoading = sendMessageMutation.isPending

function handleEmoji(obj){
  console.log(obj)
    setInputValue((pre)=> pre + obj.emoji)
}
  const handleSendMessage = async () => {
    if (inputValue.trim()) {

      try {
        const newMesage={
          _id: Math.floor((Math.random()*10)),
          userId:user._id,
          text:inputValue,
          createdAt: new Date()
        }
       socket.emit('goMessage',{newMesage,chatId,friendId})
        sendMessageMutation.mutate({
          friendId,
          text: inputValue
        })


      } catch (error) {
        console.log(error)
      }
      finally {
        setInputValue("")

      }

    }
  }

  useEffect(()=>{
      socket.on('getMessage',({newMesage,chatId})=>{
        console.log(newMesage)
           queryClient.setQueryData(
            ['messages',chatId],
            (old = [])=> [...old, newMesage]
          )
      })

      return ()=> socket.off('getMessage')
  },[])

  return (
    <div className="flex-1 flex flex-col ">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-primary/5 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3 flex-row-reverse">
          <h1 className="text-white text-lg font-semibold">{friendName}</h1>
          <div className="w-10 h-10 border bg-white border-white rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 flex items-center justify-center text-lg shadow-lg">
            <img src={friendProfilePic} alt="" />
          </div>
         
        </div>

       
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto customScroll p-6 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`flex ${message.userId === user._id ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-full backdrop-blur-md transition-all duration-200 ${message.sender === "user"
                ? "bg-gradient-to-r from-crimson-500 to-crimson-600 text-white shadow-lg shadow-crimson-500/20"
                : "bg-primary/5 text-white border border-white/20"
                }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.userId === user._id  ? "text-white/70" : "text-white/50"}`}>
            {messageTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5  backdrop-blur-xl ">
        <div className="flex items-center gap-3">


          {/* Input Field */}
          <div onClick={()=>setEmojiPicker(false)} className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Emoji Button */}
          {
                        emojiPicker && 
            <div  className="absolute  right-0 bottom-0"><EmojiPicker open={true} onEmojiClick={handleEmoji}/></div>

          }
          <button onClick={()=>setEmojiPicker(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer duration-200 flex-shrink-0">
            <Smile size={20} className="text-white/70 hover:text-crimson-500 " />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={sendLoading}
            className={`p-3 rounded-full flex-shrink-0 transition-all duration-200
    hover:bg-white/10 cursor-pointer
    bg-gradient-to-r from-crimson-500 to-crimson-600
    shadow-lg shadow-crimson-500/30 hover:shadow-crimson-500/50
    disabled:opacity-60 disabled:cursor-not-allowed 
  `}
          >
            {sendLoading ? (
              <Loader2 className="animate-spin text-white" size={18} />
            ) : (
              <Send size={18} className="text-white" />
            )}
          </button>

        </div>
      </div>
    </div>
  )
}
