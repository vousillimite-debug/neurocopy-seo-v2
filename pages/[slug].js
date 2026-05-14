import Head from 'next/head'
import Link from 'next/link'
import { supabase, fetchWithRetry } from '../lib/supabase'
import CtaInline from '../components/seo/CtaInline'
import EditorialFooter from '../components/seo/EditorialFooter'
import FaqAccordion from '../components/seo/FaqAccordion'
import H2Section from '../components/seo/H2Section'
import InternalLinks from '../components/seo/InternalLinks'

export default function SlugPage({ page }) {
  const breadcrumb = page.breadcrumb || null

  // JSON-LD Schema
  const schemas = []

  // Article schema
  if (page.schema_type === 'Article' || page.schema_type === 'BlogPosting') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': page.schema_type || 'Article',
      headline: page.h1,
      description: page.meta_description,
      ...(page.schema_extra || {}),
    })
  }

  // FAQ schema
  if (page.faq_schema && page.faq_schema.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq_schema.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    })
  }

  // Breadcrumb schema
  if (breadcrumb && breadcrumb.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    })
  }

  return (
    <>
      <Head>
        <title>{page.meta_title}</title>
        <meta name="description" content={page.meta_description} />
        {page.canonical && <link rel="canonical" href={page.canonical} />}
        {page.og_title && <meta property="og:title" content={page.og_title} />}
        {page.og_description && <meta property="og:description" content={page.og_description} />}
        <meta property="og:type" content={page.og_type || 'article'} />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div style={{ minHeight: '100vh', background: '#000000' }}>
        {/* 1. NAV */}
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
            <Link href="/" style={{
              color: '#E8FF47',
              fontWeight: 900,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              textDecoration: 'none',
            }}>
              NeuroCopy
            </Link>
            <Link href="/" style={{
              color: '#AAAAAA',
              fontSize: '14px',
              textDecoration: 'none',
            }}>
              ← Accueil
            </Link>
          </div>
        </nav>

        {/* CONTENU */}
        <main style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '40px 24px 80px',
        }}>
          {/* 2. BREADCRUMB */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '32px' }}>
            <ol style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              listStyle: 'none',
              flexWrap: 'wrap',
            }}>
              <li>
                <Link href="/" style={{ color: '#666666', fontSize: '13px', textDecoration: 'none' }}>
                  Accueil
                </Link>
              </li>
              <li style={{ color: '#444444', fontSize: '13px' }}>›</li>
              <li style={{ color: '#AAAAAA', fontSize: '13px' }}>
                {page.mot_cle_principal}
              </li>
            </ol>
          </nav>

          {/* 3. H1 */}
          <h1 style={{
            fontSize: '40px',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.8px',
            marginBottom: '32px',
            color: '#FFFFFF',
          }}>
            {page.h1}
          </h1>

          {/* 4. RÉPONSE DIRECTE */}
          {page.reponse_directe && (
            <div style={{
              background: '#111111',
              borderLeft: '4px solid #E8FF47',
              borderRadius: '0 8px 8px 0',
              padding: '20px 24px',
              marginBottom: '32px',
            }}>
              <p style={{
                color: '#FFFFFF',
                fontSize: '16px',
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                {page.reponse_directe}
              </p>
            </div>
          )}

          {/* 5. INTRO */}
          {page.intro && (
            <p style={{
              color: '#AAAAAA',
              fontSize: '17px',
              lineHeight: 1.75,
              marginBottom: '40px',
            }}>
              {page.intro}
            </p>
          )}

          {/* 6. H2 SECTIONS */}
          {page.h2_sections && page.h2_sections.map((section, i) => (
            <H2Section key={i} section={section} />
          ))}

          {/* 7. CTA INLINE */}
          <CtaInline ctaText={page.cta_text} />

          {/* 8. FAQ */}
          <FaqAccordion items={page.faq} />

          {/* 9. NOTE ÉDITORIALE */}
          {page.note_editoriale && (
            <div style={{
              borderLeft: '3px solid #E8FF47',
              paddingLeft: '20px',
              marginTop: '48px',
            }}>
              <p style={{
                color: '#AAAAAA',
                fontSize: '15px',
                fontStyle: 'italic',
                lineHeight: 1.7,
              }}>
                {page.note_editoriale}
              </p>
            </div>
          )}

          {/* 10. INTERNAL LINKS */}
          <InternalLinks links={page.internal_links} />
        </main>

        {/* 11. FOOTER */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
          <EditorialFooter />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const { data } = await supabase
    .from('pages')
    .select('slug')
    .eq('statut', 'publie')

  return {
    paths: (data || []).map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { data: page } = await fetchWithRetry(() =>
    supabase
      .from('pages')
      .select('*')
      .eq('slug', params.slug)
      .single()
  )

  if (!page) return { notFound: true }

  return {
    props: { page },

  }
}
