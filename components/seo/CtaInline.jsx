export default function CtaInline({ ctaText }) {
  if (!ctaText) return null

  return (
    <div style={{
      margin: '40px 0',
      textAlign: 'center',
    }}>
      <a
        href="https://neurocopy.fr"
        style={{
          display: 'inline-block',
          background: '#E8FF47',
          color: '#000000',
          fontWeight: 700,
          fontSize: '16px',
          padding: '14px 32px',
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        {ctaText}
      </a>
    </div>
  )
}
