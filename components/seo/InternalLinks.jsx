export default function InternalLinks({ links }) {
  if (!links || links.length === 0) return null

  return (
    <aside style={{
      background: '#111111',
      border: '1px solid #2A2A2A',
      borderRadius: '8px',
      padding: '24px',
      marginTop: '48px',
    }}>
      <p style={{
        color: '#666666',
        fontSize: '13px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '16px',
      }}>
        Sur le même sujet
      </p>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              style={{
                color: '#E8FF47',
                fontSize: '15px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#444444' }}>→</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
