"use client"

import { MessageCircle } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center ">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <MessageCircle size={48} className="text-crimson-500" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-2">Select a chat</h2>
        <p className="text-white/60 max-w-sm">Choose a conversation from the list to start messaging</p>

        
      </div>
    </div>
  )
}
