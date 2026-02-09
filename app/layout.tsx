import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MiddlewareFlowProvider } from "@/app/contexts/MiddlewareFlowContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/StructuredData";

// Force dynamic rendering for theme support
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simplewebtoolsbox.com"),
  title: {
    default: "SimpleWebToolsBox - Free Online Tools & How-To Guides",
    template: "%s | SimpleWebToolsBox",
  },
  description:
    "Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, Base64 Encoder, Hash Generator, and 35+ more tools. Expert how-to guides, tutorials, and step-by-step instructions. No registration required. 100% free forever.",
  keywords: [
    "free online tools",
    "online calculator",
    "age calculator",
    "bmi calculator",
    "password generator",
    "qr code generator",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "text converter",
    "word counter",
    "uuid generator",
    "unit converter",
    "percentage calculator",
    "random number generator",
    "html encoder",
    "url encoder",
    "timestamp converter",
    "css minifier",
    "javascript minifier",
    "gradient generator",
    "box shadow generator",
    "how-to guides",
    "tutorials",
    "web tools",
    "developer tools",
    "productivity tools",
    "text tools",
    "security tools",
    "design tools",
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
    title: "SimpleWebToolsBox - Free Online Tools & How-To Guides",
    description:
      "Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, and 35+ more tools. Expert how-to guides and tutorials. No registration required.",
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
      "Free online tools and calculators: Age Calculator, BMI Calculator, Password Generator, QR Code Generator, JSON Formatter, and 35+ more tools. Expert how-to guides and tutorials.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
        {/* Canonical */}
        <link rel="canonical" href="https://simplewebtoolsbox.com" />

        {/* Google AdSense – MUST be plain script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2268511139409784"
          crossOrigin="anonymous"
        ></script>

        {/* Favicons */}
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="icon" sizes="32x32" href="/logo.png" />
        <link rel="icon" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      </head>

      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        {/* Google reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />

        {/* reCAPTCHA callback */}
        <Script
          id="recaptcha-callback"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.handleRecaptchaCallback = function(token) {
                window.dispatchEvent(
                  new CustomEvent('recaptcha-verified', { detail: { token } })
                );
              };
            `,
          }}
        />

        {/* Structured Data */}
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SimpleWebToolsBox",
            url: "https://simplewebtoolsbox.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://simplewebtoolsbox.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
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
                name: "Are these tools really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! All tools are 100% free forever. No registration, no hidden costs, no premium tiers. We believe powerful tools should be accessible to everyone.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data safe and private?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. All tools run entirely in your browser. Your data never leaves your device and is never sent to our servers. Complete privacy guaranteed.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No account required! Just visit the tool you need and start using it immediately. No signup, no email, no hassle.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use these tools on mobile?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! All tools are fully responsive and work perfectly on mobile phones, tablets, and desktops. Use them anywhere, anytime.",
                },
              },
            ],
          }}
        />

        <ThemeProvider>
          <MiddlewareFlowProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </MiddlewareFlowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
