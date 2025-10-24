"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { getChatList } from "../../services/apiService"
import {useQuery} from '@tanstack/react-query'
import Loader from "./Loader"
import { useSelector } from "react-redux"


export default function ChatList({ selectedChat, onSelectChat }) {
  const {user}=useSelector((state)=>state.user)
    const [searchQuery, setSearchQuery] = useState("")
  const {data,isLoading,isError}=useQuery({
  queryKey:['chats'],
  queryFn: async ()=> (await getChatList()).data
})

console.log(data?.members)


  return (
    <div className="w-full md:w-80 flex flex-col border-r  border-white/10 bg-primary/10 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 ">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
            <Plus size={20} className="text-crimson-500" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Chat List */}
      {
        isLoading && <Loader/>
      }
      {
        ( !isLoading && !data || data?.members?.length==0 ) &&  <div className=" flex items-center justify-center">
        <p className="text-white/50 p-4 ">No chats available. Start a new conversation!</p>
      </div>
      }
      <div className="flex-1 overflow-y-auto">
        {data?.members?.map((chat) => (
          <button
            key={chat.member._id}
            onClick={() => onSelectChat(chat)}
            className={`w-full px-4 py-3 border-b border-white/5 transition-all duration-200 hover:bg-white/10 ${
              selectedChat?.id === chat.member.id ? "bg-white/15 border-l-2 border-l-crimson-500" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crimson-400 to-crimson-600 flex items-center justify-center text-xl flex-shrink-0 shadow-lg">
                {chat.member.avatar}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-white truncate">{chat.member.fullName}</h3>
                  {/* <span className="text-xs text-white/50 flex-shrink-0">{chat.member.timestamp}</span> */}
                </div>
                <p className="text-sm text-white/60 truncate">{chat.lastMessage.text}</p>
              </div>

              {/* Unread Badge */}
              {/* {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-crimson-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {chat.unread}
                </div>
              )} */}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
