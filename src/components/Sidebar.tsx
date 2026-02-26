import { Chapter } from '../types'
import { CHAPTERS } from '../data/chapters'

interface Props {
  selected: Chapter | null
  connected: boolean
  onSelect: (ch: Chapter) => void
}

export default function Sidebar({ selected, connected, onSelect }: Props) {
  return (
    <aside style={{
      width: 224, minWidth: 224,
      background: 'var(--ink2)',
      borderRight: '1px solid var(--border)',
      overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '18px 16px 10px',
        fontSize: 10, color: 'var(--vermillion)',
        letterSpacing: 3, fontWeight: 300,
        fontFamily: "'Noto Sans JP', sans-serif",
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        textTransform: 'uppercase',
      }}>章 · Chapters</div>

      {CHAPTERS.map(ch => {
        const isActive = selected?.id === ch.id
        return (
          <div
            key={ch.id}
            onClick={() => connected && onSelect(ch)}
            style={{
              padding: '13px 16px',
              cursor: connected ? 'pointer' : 'not-allowed',
              opacity: connected ? 1 : 0.45,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              borderLeft: isActive ? '2px solid var(--vermillion)' : '2px solid transparent',
              background: isActive ? 'rgba(184,48,37,0.15)' : 'transparent',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              if (!isActive && connected)
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(184,48,37,0.08)'
            }}
            onMouseLeave={e => {
              if (!isActive)
                (e.currentTarget as HTMLDivElement).style.background = 'transparent'
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--vermillion)', marginBottom: 3, letterSpacing: 1 }}>{ch.num}</div>
            <div style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 13, fontWeight: 600,
              color: 'var(--snow)', lineHeight: 1.4,
            }}>{ch.title}</div>
            <div style={{
              fontSize: 11, color: 'var(--mist)',
              marginTop: 3, lineHeight: 1.4,
              fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300,
            }}>{ch.sub}</div>
          </div>
        )
      })}
    </aside>
  )
}
