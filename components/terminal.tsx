'use client'

import { useState, useRef, useEffect } from 'react'
import { Command, commands } from '@/lib/commands'

interface Message {
  type: 'user' | 'system' | 'ai'
  content: string
}

export function Terminal() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { type: 'system', content: 'Welcome to ZIMA Terminal. Type "help" to see available commands.' }
  ])
  const [isAiMode, setIsAiMode] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleCommand = async (cmd: string) => {
    const command = cmd.toLowerCase().trim() as Command

    if (isAiMode && command !== 'exit') {
      // In AI chat mode, send message to AI
      setMessages(prev => [...prev, { type: 'user', content: cmd }])
      try {
        // Here you would integrate with your AI endpoint
        setMessages(prev => [...prev, { type: 'ai', content: 'AI response simulation' }])
      } catch (error) {
        setMessages(prev => [...prev, { type: 'system', content: 'Error communicating with AI' }])
      }
      return
    }

    switch (command) {
      case 'help':
        setMessages(prev => [...prev, 
          { type: 'system', content: 'Available commands:' },
          ...Object.entries(commands).map(([cmd, desc]) => (
            { type: 'system', content: `${cmd}: ${desc}` }
          ))
        ])
        break
      case 'clear':
        setMessages([])
        break
      case 'exit':
        if (isAiMode) {
          setIsAiMode(false)
          setMessages(prev => [...prev, { type: 'system', content: 'Exited AI chat mode' }])
        } else {
          window.location.href = '/'
        }
        break
      case 'chat':
        setIsAiMode(true)
        setMessages(prev => [...prev, { type: 'system', content: 'Entered AI chat mode. Type "exit" to leave.' }])
        break
      case 'about':
        setMessages(prev => [...prev, { type: 'system', content: 'ZIMA is an advanced AI assistant designed to help with various tasks.' }])
        break
      case 'theme':
        // Implement theme toggle logic here
        setMessages(prev => [...prev, { type: 'system', content: 'Theme toggled (not implemented)' }])
        break
      case 'contract':
        setMessages(prev => [...prev, { type: 'system', content: 'ZIMA Token Contract Address: 0x1234567890123456789012345678901234567890' }])
        break
      default:
        setMessages(prev => [...prev, { type: 'system', content: `Command not found: ${cmd}` }])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, { type: 'user', content: input }])
    handleCommand(input)
    setInput('')
  }

  return (
    <div className="bg-[#000510] text-[#4ff2ff] p-4 rounded-lg h-[80vh] overflow-auto font-mono">
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`${
            msg.type === 'user' ? 'text-[#4ff2ff]' : 
            msg.type === 'system' ? 'text-gray-400' : 
            'text-green-400'
          }`}>
            {msg.type === 'user' ? '> ' : msg.type === 'system' ? '# ' : 'AI: '}
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent outline-none text-[#4ff2ff] placeholder-[#4ff2ff]/50"
          placeholder={isAiMode ? "Chat with ZIMA..." : "Enter command..."}
          autoFocus
        />
      </form>
    </div>
  )
}

