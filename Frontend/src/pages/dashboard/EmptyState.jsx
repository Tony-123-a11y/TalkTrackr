"use client"

import { MessageCircle } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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

        {/* Decorative Elements */}
        <div className="mt-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse"></div>
            <span className="text-sm text-white/70">Waiting for messages...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
