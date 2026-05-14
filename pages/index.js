import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Home({ pages }) {
  const cocons = [...new Set(pages.map(p => p.cocon).filter(Boolean))]

  return (
    <>
      <Head>
        <title>NeuroCopy SEO — Copy qui convertit</title>
        <meta name="description" content="Ressources sur le copywriting, le neuromarketing et la conversion. Pour les growth marketeurs qui veulent comprendre pourquoi ça marche." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#000000' }}>
        {/* NAV */}
        <nav style={{
          borderBottom: '1px solid #2A2A2A',
          padding: '0 24px',
        }}>
          <div style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}>
            <span style={{
              color: '#E8FF47',
              fontWeight: 900,
              fontSize: '20px',
              letterSpacing: '-0.5px',
            }}>
              NeuroCopy
            </span>
            <a
              href="https://neurocopy.fr"
              style={{
                background: '#E8FF47',
                color: '#000000',
                fontWeight: 700,
                fontSize: '14px',
                padding: '8px 18px',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Essayer l&apos;app →
            </a>
          </div>
        </nav>

        {/* HERO */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '80px 24px 60px',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: '20px',
          }}>
            Le copy qui parle<br />
            <span style={{ color: '#E8FF47' }}>au cerveau.</span>
          </h1>
          <p style={{
            color: '#AAAAAA',
            fontSize: '18px',
            maxWidth: '560px',
            lineHeight: 1.6,
          }}>
            Neuromarketing, biais cognitifs, copywriting direct response — toutes les ressources pour écrire du copy qui convertit vraiment.
          </p>
        </div>

        {/* COCONS */}
        <div style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}>
          {cocons.map(cocon => {
            const coconPages = pages.filter(p => p.cocon === cocon)
            const pilier = coconPages.find(p => p.type === 'pilier')
            const satellites = coconPages.filter(p => p.type === 'satellite')

            return (
              <div key={cocon} style={{ marginBottom: '56px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>
                    {cocon}
                  </h2>
                  <span style={{
                    background: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    color: '#666666',
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {coconPages.length} articles
                  </span>
                </div>

                {pilier && (
                  <Link href={`/${pilier.slug}`} style={{
                    display: 'block',
                    background: '#111111',
                    border: '1px solid #2A2A2A',
                    borderLeft: '3px solid #E8FF47',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    marginBottom: '8px',
                    textDecoration: 'none',
                  }}>
                    <span style={{
                      color: '#E8FF47',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      Pilier
                    </span>
                    <p style={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '16px',
                      marginTop: '4px',
                    }}>
                      {pilier.h1 || pilier.mot_cle_principal}
                    </p>
                  </Link>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '8px',
                }}>
                  {satellites.map(page => (
                    <Link key={page.slug} href={`/${page.slug}`} style={{
                      display: 'block',
                      background: '#0A0A0A',
                      border: '1px solid #2A2A2A',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      textDecoration: 'none',
                    }}>
                      <p style={{
                        color: '#CCCCCC',
                        fontSize: '14px',
                        lineHeight: 1.4,
                      }}>
                        {page.h1 || page.mot_cle_principal}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data } = await supabase
    .from('pages')
    .select('slug, cocon, type, h1, mot_cle_principal')
    .eq('statut', 'publie')
    .order('cocon')

  return {
    props: { pages: data || [] },
    revalidate: 86400,
  }
}
