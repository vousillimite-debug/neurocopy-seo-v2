export default function H2Section({ section }) {
  if (!section) return null

  // Split le contenu en paragraphes sur les fins de phrases suivies d'une majuscule
  const paragraphs = section.contenu
    ? section.contenu.split(/(?<=[.!?])\s+(?=[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ])/)
    : []

  return (
    <section style={{ marginTop: '40px' }}>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '16px',
        lineHeight: 1.3,
      }}>
        {section.h2}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{
            color: '#CCCCCC',
            fontSize: '16px',
            lineHeight: 1.75,
          }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
