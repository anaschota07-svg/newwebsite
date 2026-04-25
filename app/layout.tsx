import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/StructuredData";

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
      </head>

      <body
        className="antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      >
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2268511139409784"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Structured Data */}
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SimpleWebToolsBox",
            url: "https://simplewebtoolsbox.com",
            description:
              "Practical articles and free browser-based tools for everyday tasks, with clear ownership and policy pages.",
          }}
        />

        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SimpleWebToolsBox",
            url: "https://simplewebtoolsbox.com",
            logo: "https://simplewebtoolsbox.com/logo.png",
          }}
        />

        {/* FAQ Structured Data */}
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is SimpleWebToolsBox focused on?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SimpleWebToolsBox focuses on practical guides and clearly explained resources in areas like finance, study, and technology. The goal is to publish useful content that helps people make sense of common topics without unnecessary filler.",
                },
              },
              {
                "@type": "Question",
                name: "Who publishes the content on this site?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The site is published and maintained by Mohd Washid under the SimpleWebToolsBox brand, with supporting policy, contact, and editorial pages available for transparency.",
                },
              },
              {
                "@type": "Question",
                name: "How are the guides maintained?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Guides are reviewed and updated when examples, recommendations, or important context become outdated. The published set is intentionally smaller so the site can focus on quality and clarity.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact the site owner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can use the contact page to reach the publisher for questions, corrections, or business communication. Supporting trust pages like the editorial policy, disclaimer, and DMCA page are also available in the footer.",
                },
              },
            ],
          }}
        />

        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
