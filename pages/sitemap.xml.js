import { supabase } from '../lib/supabase'

function generateSiteMap(pages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://neurocopy.fr</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${pages.map(page => `
  <url>
    <loc>https://neurocopy.fr/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page.type === 'pilier' ? '0.9' : '0.7'}</priority>
  </url>`).join('')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  const { data: pages } = await supabase
    .from('pages')
    .select('slug, type')
    .eq('statut', 'publie')

  const sitemap = generateSiteMap(pages || [])

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {}
