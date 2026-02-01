import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/StructuredData";

// Force dynamic rendering for theme support
export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://simplewebtoolsbox.com'),
  title: {
    default: "SimpleWebToolsBox - Free Online Tools & How-To Guides",
    template: "%s | SimpleWebToolsBox"
  },
  description: "Access free online tools including Age Calculator, BMI Calculator, Text Converter, and more. Expert how-to guides and tutorials to help you get things done.",
  keywords: ["online tools", "free tools", "calculator", "converter", "how-to guides", "tutorials"],
  authors: [{ name: "SimpleWebToolsBox" }],
  creator: "SimpleWebToolsBox",
  publisher: "SimpleWebToolsBox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simplewebtoolsbox.com",
    siteName: "SimpleWebToolsBox",
    title: "SimpleWebToolsBox - Free Online Tools & How-To Guides",
    description: "Access free online tools including Age Calculator, BMI Calculator, Text Converter, and more. Expert how-to guides and tutorials to help you get things done.",
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
    title: "SimpleWebToolsBox - Free Online Tools & How-To Guides",
    description: "Access free online tools and how-to guides to make your life easier.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://simplewebtoolsbox.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const theme = savedTheme || systemTheme;
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100`}>
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'SimpleWebToolsBox',
            url: 'https://simplewebtoolsbox.com',
            description: 'Free online tools and how-to guides to help you get things done.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://simplewebtoolsbox.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SimpleWebToolsBox',
            url: 'https://simplewebtoolsbox.com',
            logo: 'https://simplewebtoolsbox.com/logo.png',
            sameAs: [],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              url: 'https://simplewebtoolsbox.com/contact',
            },
          }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
