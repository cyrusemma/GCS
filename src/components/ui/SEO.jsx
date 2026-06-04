import { Helmet } from "react-helmet-async"

const SITE_NAME = "Golden Crown School"
const SITE_URL = "https://www.goldencrownschool.edu.gh"
const DEFAULT_DESC =
  "Golden Crown School, Lashibi — a KG to JHS basic school in Tema, Greater Accra, Ghana. Established 2004. Hardwork and Integrity."
const OG_IMAGE = `${SITE_URL}/favicon-256.png`

// Per-page SEO: title, description, canonical, Open Graph + Twitter cards.
export default function SEO({ title, description = DEFAULT_DESC, path = "/", image = OG_IMAGE }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME}, Lashibi — Hardwork and Integrity`
  const url = `${SITE_URL}${path}`
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
