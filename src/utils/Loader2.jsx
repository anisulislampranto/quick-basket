import React from 'react'

export default function Loader2() {
  return (
    <div class="flex items-center justify-center h-32 space-x-2">
        <div class="w-6 h-6 bg-gray-700 rounded-full animate-bounce delay-200"></div>
        <div class="w-6 h-6 bg-gray-400 rounded-full animate-bounce delay-400"></div>
        <div class="w-6 h-6 bg-gray-700 rounded-full animate-bounce delay-600"></div>
        <div class="w-6 h-6 bg-gray-400 rounded-full animate-bounce delay-800"></div>
    </div>

  )
}
