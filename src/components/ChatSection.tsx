import { useState, useRef, useEffect } from 'react'
import { Message } from '../types'

interface Props {
  messages: Message[]
  loading: boolean
  onSend: (text: string) => void
  chapterTitle: string
}

export default function ChatSection({ messages, loading, onSend, chapterTitle }: Props) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    onSend(text)
  }

  return (
    <>
      {/* Chat messages */}
      {messages.length > 0 && (
        <div style={{
          marginTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: 24,
        }}>
          <div style={{
            fontSize: 10, color: 'var(--vermillion)',
            letterSpacing: 3, marginBottom: 16,
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>問いかけ · Questions</div>

          {messages.map((msg, i) => (
            <div key={i} className="fade-up" style={{
              marginBottom: 14,
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}>
              <div style={{
                maxWidth: '82%',
                padding: '11px 16px',
                borderRadius: 8,
                fontSize: 14, lineHeight: 1.9,
                fontFamily: "'Noto Serif JP', serif", fontWeight: 300,
                background: msg.role === 'user'
                  ? 'var(--vermillion)'
                  : 'rgba(255,255,255,0.05)',
                color: msg.role === 'user' ? 'white' : 'rgba(245,240,232,0.85)',
                border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--mist)', fontSize: 13 }}>
              <div style={{
                width: 16, height: 16,
                border: '2px solid rgba(184,48,37,0.2)',
                borderTop: '2px solid var(--vermillion)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              考えています...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* Input bar */}
      <div style={{
        padding: '14px 32px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(22,18,16,0.9)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
            placeholder={`「${chapterTitle}」について質問する...`}
            style={{
              flex: 1, padding: '10px 14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, color: 'var(--paper)',
              fontSize: 14, resize: 'none', lineHeight: 1.6,
              fontFamily: "'Noto Serif JP', serif", fontWeight: 300,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: '10px 18px', height: 62,
              background: loading || !input.trim() ? 'rgba(184,48,37,0.2)' : 'var(--vermillion)',
              color: loading || !input.trim() ? 'var(--mist)' : 'white',
              border: 'none', borderRadius: 6,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: 13, whiteSpace: 'nowrap',
              fontFamily: "'Noto Sans JP', sans-serif",
              transition: 'background 0.2s',
            }}
          >送信</button>
        </div>
        <div style={{ marginTop: 5, fontSize: 10, color: 'rgba(128,104,96,0.5)', fontFamily: "'Noto Sans JP', sans-serif" }}>
          Enter で送信 · Shift+Enter で改行
        </div>
      </div>
    </>
  )
}
