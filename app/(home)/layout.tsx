import { homeFaqJsonLd } from '@/data/homeFaqJsonLd'

/** Route group `(home)` wraps only `/` so FAQ JSON-LD is not emitted on /blog, /tools, etc. */
export default function HomeRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        id="json-ld-faq-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      {children}
    </>
  )
}
