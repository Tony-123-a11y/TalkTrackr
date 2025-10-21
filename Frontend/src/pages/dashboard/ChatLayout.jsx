"use client"

import { useState } from "react"
import ChatList from "@/components/UI/ChatList"
import ChatWindow from "./ChatWindow"
import EmptyState from "./EmptyState"

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Left Sidebar - Chat List */}
      <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />

      {/* Right Side - Chat Window or Empty State */}
      {selectedChat ? <ChatWindow chat={selectedChat} /> : <EmptyState />}
    </div>
  )
}
