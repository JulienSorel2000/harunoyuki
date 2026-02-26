interface Props {
  content: string
}

export default function GuideView({ content }: Props) {
  const lines = content.split('\n')

  return (
    <div className="fade-up">
      {/* Ornament */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, opacity: 0.3 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--vermillion)' }} />
        <div style={{ width: 5, height: 5, background: 'var(--vermillion)', transform: 'rotate(45deg)' }} />
        <div style={{ flex: 1, height: 1, background: 'var(--vermillion)' }} />
      </div>

      {lines.map((line, i) => {
        // Bold section headers **text**
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <div key={i} style={{
              fontFamily: "'Shippori Mincho', serif",
              fontSize: 14, fontWeight: 700,
              color: 'var(--vermillion2)',
              marginTop: 24, marginBottom: 8,
              letterSpacing: 2,
              paddingBottom: 5,
              borderBottom: '1px solid rgba(184,48,37,0.22)',
            }}>
              {line.replace(/\*\*/g, '')}
            </div>
          )
        }
        // Bullet points
        if (line.startsWith('- ') || line.startsWith('・')) {
          return (
            <div key={i} style={{
              fontSize: 14, lineHeight: 2,
              color: 'rgba(245,240,232,0.78)',
              paddingLeft: 14, marginBottom: 5,
              fontFamily: "'Noto Serif JP', serif", fontWeight: 300,
            }}>
              <span style={{ color: 'var(--vermillion)', marginRight: 6 }}>・</span>
              {line.replace(/^[-・]\s*/, '')}
            </div>
          )
        }
        // Empty line
        if (line.trim() === '') return <div key={i} style={{ height: 6 }} />
        // Normal text
        return (
          <div key={i} style={{
            fontSize: 14, lineHeight: 2,
            color: 'rgba(245,240,232,0.82)',
            fontFamily: "'Noto Serif JP', serif", fontWeight: 300,
            marginBottom: 2,
          }}>
            {line}
          </div>
        )
      })}
    </div>
  )
}
