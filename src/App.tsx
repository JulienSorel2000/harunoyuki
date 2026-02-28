import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Welcome from './components/Welcome'
import GuideView from './components/GuideView'
import { Chapter, Message } from './types'
import { callClaude } from './data/api'

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [connected, setConnected] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [guideContent, setGuideContent] = useState('')
  const [guideLoading, setGuideLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [chatLoading, setChatLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollAreaRef.current?.scrollTo({ top: 0 }) }, [selectedChapter])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, chatLoading])

  const handleConnect = (key: string) => { setApiKey(key); setConnected(true) }

  const handleSelectChapter = async (ch: Chapter) => {
    if (selectedChapter?.id === ch.id) { setSidebarOpen(false); return }
    setSelectedChapter(ch); setMessages([]); setGuideContent(''); setChatInput(''); setGuideLoading(true); setSidebarOpen(fal
cat > ~/Desktop/haru-no-yuki/src/App.tsx << 'APPEOF'
import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Welcome from './components/Welcome'
import GuideView from './components/GuideView'
import { Chapter, Message } from './types'
import { callClaude } from './data/api'

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [connected, setConnected] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [guideContent, setGuideContent] = useState('')
  const [guideLoading, setGuideLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [chatLoading, setChatLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollAreaRef.current?.scrollTo({ top: 0 }) }, [selectedChapter])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, chatLoading])

  const handleConnect = (key: string) => { setApiKey(key); setConnected(true) }

  const handleSelectChapter = async (ch: Chapter) => {
    if (selectedChapter?.id === ch.id) { setSidebarOpen(false); return }
    setSelectedChapter(ch); setMessages([]); setGuideContent(''); setChatInput(''); setGuideLoading(true); setSidebarOpen(false)
    try {
      const text = await callClaude([{ role: 'user', content: `『春の雪』の「${ch.num}：${ch.title}」の解説をお願いします。\nこの章の概要：${ch.sub}` }], apiKey)
      setGuideContent(text)
    } catch (e) { setGuideContent(`エラー：${(e as Error).message}`) }
    setGuideLoading(false)
  }

  const handleSendMessage = async () => {
    const text = chatInput.trim()
    if (!text || chatLoading || !selectedChapter) return
    setChatInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setChatLoading(true)
    try {
      const ctx = `『春の雪』「${selectedChapter.num}：${selectedChapter.title}」について：\n\n`
      const reply = await callClaude([...messages.map(m => ({ role: m.role, content: m.role === 'user' ? ctx + m.content : m.content })), { role: 'user', content: ctx + text }], apiKey)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) { setMessages(prev => [...prev, { role: 'assistant', content: `エラー：${(e as Error).message}` }]) }
    setChatLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      <Header connected={connected} onConnect={handleConnect} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: 58 }}>
        <div className="desktop-sidebar"><Sidebar selected={selectedChapter} connected={connected} onSelect={handleSelectChapter} /></div>
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200 }} />}
        <div className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`}><Sidebar selected={selectedChapter} connected={connected} onSelect={handleSelectChapter} /></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--ink)', minWidth: 0 }}>
          {!selectedChapter ? (
            <>
              <div className="mobile-chapter-bar"><button onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: '1px solid rgba(184,48,37,0.4)', borderRadius: 6, color: 'var(--vermillion)', padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontFamily: "'Noto Sans JP', sans-serif" }}>章を選ぶ ▾</button></div>
              <Welcome connected={connected} />
            </>
          ) : (
            <>
              <div style={{ padding: '12px 20px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(22,18,16,0.85)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="mobile-back-btn" onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', color: 'var(--vermillion)', cursor: 'pointer', fontSize: 20, flexShrink: 0, padding: '0 4px' }}>☰</button>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--vermillion)', letterSpacing: 2, fontFamily: "'Noto Sans JP', sans-serif" }}>{selectedChapter.num}</div>
                  <div style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 18, fontWeight: 700, color: 'var(--snow)', letterSpacing: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedChapter.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--mist)', fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300 }}>{selectedChapter.sub}</div>
                </div>
              </div>
              <div ref={scrollAreaRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
                {guideLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--mist)', fontSize: 14 }}>
                    <div style={{ width: 20, height: 20, border: '2px solid rgba(184,48,37,0.2)', borderTop: '2px solid var(--vermillion)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
                    解説を生成しています...
                  </div>
                ) : <GuideView content={guideContent} />}
                {messages.length > 0 && (
                  <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
                    <div style={{ fontSize: 10, color: 'var(--vermillion)', letterSpacing: 3, marginBottom: 16, fontFamily: "'Noto Sans JP', sans-serif" }}>問いかけ · Questions</div>
                    {messages.map((msg, i) => (
                      <div key={i} className="fade-up" style={{ marginBottom: 14, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{ maxWidth: '88%', padding: '10px 14px', borderRadius: 8, fontSize: 14, lineHeight: 1.9, fontFamily: "'Noto Serif JP', serif", fontWeight: 300, background: msg.role === 'user' ? 'var(--vermillion)' : 'rgba(255,255,255,0.05)', color: msg.role === 'user' ? 'white' : 'rgba(245,240,232,0.85)', border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>{msg.content}</div>
                      </div>
                    ))}
                    {chatLoading && <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mist)', fontSize: 13 }}><div style={{ width: 16, height: 16, border: '2px solid rgba(184,48,37,0.2)', borderTop: '2px solid var(--vermillion)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />考えています...</div>}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(22,18,16,0.95)', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <textarea rows={2} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage() } }} placeholder="質問する..." style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'var(--paper)', fontSize: 14, resize: 'none', lineHeight: 1.6, fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }} />
                  <button onClick={handleSendMessage} disabled={chatLoading || !chatInput.trim()} style={{ padding: '10px 14px', height: 62, background: chatLoading || !chatInput.trim() ? 'rgba(184,48,37,0.2)' : 'var(--vermillion)', color: chatLoading || !chatInput.trim() ? 'var(--mist)' : 'white', border: 'none', borderRadius: 6, cursor: chatLoading || !chatInput.trim() ? 'not-allowed' : 'pointer', fontSize: 13, whiteSpace: 'nowrap', fontFamily: "'Noto Sans JP', sans-serif" }}>送信</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
