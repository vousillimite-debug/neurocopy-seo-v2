export default function EditorialFooter() {
  return (
    <footer style={{
      borderTop: '1px solid #2A2A2A',
      marginTop: '80px',
      padding: '40px 0',
      textAlign: 'center',
    }}>
      <p style={{
        color: '#666666',
        fontSize: '14px',
        marginBottom: '8px',
      }}>
        NeuroCopy · Le copy parle au cerveau, pas à l&apos;œil.
      </p>
      <p style={{ color: '#444444', fontSize: '13px' }}>
        © {new Date().getFullYear()} NeuroCopy
      </p>
    </footer>
  )
}
