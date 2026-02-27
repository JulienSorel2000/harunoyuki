import { useState } from 'react'

interface Props {
  connected: boolean
  onConnect: (key: string) => void
}

export default function Header({ connected, onConnect }: Props) {
  const [input, setInput] = useState('')

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 58,
      background: 'rgba(12,11,10,0.96)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(184,48,37,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
    }}>
      {/* Left: title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 22, fontWeight: 800,
          letterSpacing: 6, color: '#f9f6f0',
        }}>春の雪</span>
        <span style={{
          fontSize: 11, color: 'var(--vermillion)',
          letterSpacing: 2, fontWeight: 300,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>豊饒の海 第一巻 · 三島由紀夫</span>
      </div>

      {/* Right: API key or connected badge */}
      {!connected ? (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="password"
            placeholder="Groq API Key を入力"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && input.trim() && onConnect(input.trim())}
            style={{
              padding: '7px 12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(184,48,37,0.35)',
              borderRadius: 4, color: 'var(--paper)',
              fontSize: 12, fontFamily: 'monospace',
              width: 230,
              transition: 'border-color 0.2s',
            }}
          />
          <button
            onClick={() => input.trim() && onConnect(input.trim())}
            style={{
              padding: '7px 14px',
              background: 'var(--vermillion)', color: 'white',
              border: 'none', borderRadius: 4,
              cursor: 'pointer', fontSize: 12,
              fontFamily: "'Noto Sans JP', sans-serif",
              letterSpacing: 1,
            }}
          >接続</button>
        </div>
      ) : (
        <div style={{
          fontSize: 12, color: 'var(--mist)',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Noto Sans JP', sans-serif",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6bcb77', display: 'inline-block' }} />
          接続済み
        </div>
      )}
    </header>
  )
}
