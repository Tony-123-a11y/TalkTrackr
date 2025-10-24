
import { useState } from "react"
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from "lucide-react"
import { useParams } from "react-router-dom"
import { getMessages } from "../../services/apiService"
import {useQuery} from '@tanstack/react-query'


export default function ChatWindow({ chat }) {
   const {chatId}= useParams()
   console.log(chatId)
  const [inputValue, setInputValue] = useState("")
const [messages, setMessages] = useState(null);
  const{data,isLoading,isError}=useQuery({
    queryKey:['messages'],
    queryFn: async ()=> (await getMessages(chatId)).data
  })

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  return (
    <div className="flex-1 flex flex-col ">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-primary/5 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 flex items-center justify-center text-lg shadow-lg">
            {/* {chat.avatar} */}
          </div>
          <div>
            {/* <h2 className="font-semibold text-white">{chat.name}</h2> */}
            <p className="text-xs text-white/50">Active now</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Phone size={18} className="text-white/70 hover:text-crimson-500" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Video size={18} className="text-white/70 hover:text-crimson-500" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
            <MoreVertical size={18} className="text-white/70 hover:text-crimson-500" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto customScroll p-6 space-y-4">
        {data?.conversation.messages.map((message) => (
          <div key={message._id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-full backdrop-blur-md transition-all duration-200 ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-crimson-500 to-crimson-600 text-white shadow-lg shadow-crimson-500/20"
                  : "bg-primary/5 text-white border border-white/20"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-white/50"}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-end gap-3">
          {/* Attachment Button */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0">
            <Paperclip size={20} className="text-white/70 hover:text-crimson-500" />
          </button>

          {/* Input Field */}
          <div className="flex-1 relative">
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
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 flex-shrink-0">
            <Smile size={20} className="text-white/70 hover:text-crimson-500" />
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-3 bg-gradient-to-r from-crimson-500 to-crimson-600 hover:from-crimson-600 hover:to-crimson-700 rounded-full transition-all duration-200 flex-shrink-0 shadow-lg shadow-crimson-500/30 hover:shadow-crimson-500/50"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
