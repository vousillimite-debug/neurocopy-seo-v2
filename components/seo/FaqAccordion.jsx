import { useState } from 'react'

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!items || items.length === 0) return null

  return (
    <section style={{ marginTop: '48px' }}>
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: '#FFFFFF',
        marginBottom: '24px',
      }}>
        Questions fréquentes
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              style={{
                background: '#111111',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '18px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span style={{
                  color: isOpen ? '#E8FF47' : '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: 1.5,
                }}>
                  {item.q}
                </span>
                <span style={{
                  color: '#E8FF47',
                  fontSize: '22px',
                  fontWeight: 400,
                  flexShrink: 0,
                  lineHeight: 1,
                }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div style={{
                  padding: '0 20px 20px',
                  color: '#CCCCCC',
                  fontSize: '15px',
                  lineHeight: 1.7,
                }}>
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
