import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteAndOrganizationJsonLd } from "@/data/siteStructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://simplewebtoolsbox.com"),
  title: {
    default: "SimpleWebToolsBox - Practical Guides & Resources",
    template: "%s | SimpleWebToolsBox",
  },
  description:
    "Free browser tools and in-depth guides on technology, study, and finance, with a named publisher, tool pages that explain use and limits, and transparent policy and contact pages.",
  keywords: [
    "practical guides",
    "technology guides",
    "study guides",
    "finance guides",
    "expert guides",
    "educational resources",
    "tutorials",
    "step by step guides",
    "simplewebtoolsbox",
  ],
  authors: [{ name: "SimpleWebToolsBox" }],
  creator: "SimpleWebToolsBox",
  publisher: "SimpleWebToolsBox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simplewebtoolsbox.com",
    siteName: "SimpleWebToolsBox",
    title: "SimpleWebToolsBox - Practical Guides & Resources",
    description:
      "SimpleWebToolsBox publishes practical guides and focused resources across finance, study, and technology topics, with clear ownership and transparent policies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SimpleWebToolsBox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SimpleWebToolsBox",
    description:
      "SimpleWebToolsBox publishes practical guides and focused resources across finance, study, and technology topics, with clear ownership and transparent policies.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "https://simplewebtoolsbox.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* AdSense site verification meta tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-2268511139409784"
        />

        {/* Favicons */}
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="icon" sizes="32x32" href="/logo.png" />
        <link rel="icon" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />

        {/* Site-wide JSON-LD once in <head> (single @graph) — not in <body>, to avoid duplicate blocks from streaming */}
        <script
          id="json-ld-site-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteAndOrganizationJsonLd),
          }}
        />

        {/* Plain async script: next/script adds data-nscript which AdSense warns about */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2268511139409784"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className="antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
