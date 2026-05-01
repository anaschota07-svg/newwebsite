import Script from 'next/script'

/** AdSense only on main content routes — legal/policy pages stay lighter (no third-party ad script). */
export default function WithAdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="adsense-loader"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2268511139409784"
        crossOrigin="anonymous"
      />
      {children}
    </>
  )
}
