export default function Welcome({ connected }: { connected: boolean }) {
  return (
    <div style={{
      flex: 1, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: 40,
    }}>
      <div className="fade-up" style={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>
        {/* Quote */}
        <div style={{
          fontFamily: "'Shippori Mincho', serif",
          fontSize: 17, fontWeight: 400,
          lineHeight: 2.4, letterSpacing: 3,
          color: 'rgba(245,240,232,0.65)',
          borderLeft: '2px solid var(--vermillion)',
          paddingLeft: 20, textAlign: 'left',
          marginBottom: 32,
        }}>
          美しいものを愛する心も、<br />
          醜いものを恐れる心も、<br />
          ひとしく、人間の証しである。
        </div>

        {/* Description */}
        <p style={{
          fontSize: 14, color: 'var(--mist)',
          lineHeight: 2, fontFamily: "'Noto Sans JP', sans-serif",
          fontWeight: 300, marginBottom: 24,
        }}>
          章を選んでAIが日本語で解説を生成します。<br />
          象徴・登場人物の心理・文学的技法を丁寧に読み解きます。
        </p>

        {/* API hint */}
        {!connected && (
          <div style={{
            padding: '14px 18px',
            background: 'rgba(184,48,37,0.07)',
            border: '1px solid rgba(184,48,37,0.22)',
            borderRadius: 6,
            fontSize: 12, color: 'var(--mist)',
            fontFamily: "'Noto Sans JP', sans-serif",
            lineHeight: 1.8,
          }}>
            まず右上に Anthropic API Key を入力してください。<br />
            <span style={{ color: 'var(--paper)', fontWeight: 400 }}>console.anthropic.com</span> で取得できます。
          </div>
        )}
      </div>
    </div>
  )
}
