"use client"

import { useState } from "react"
import ChatList from "@/components/UI/ChatList"
import ChatWindow from "./ChatWindow"
import EmptyState from "./EmptyState"
import { Outlet } from "react-router-dom"

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Chat List */}
      <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />

      <Outlet/>
    </div>
  )
}
