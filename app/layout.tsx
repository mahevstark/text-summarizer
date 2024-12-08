import type { Metadata } from "next";
import "./globals.css";
import { Inter, Public_Sans } from 'next/font/google'
import Notification from './components/Notification'

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Text Summarizer by Undetectable AI | Summarize Text Instantly",
  description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
  keywords: "text summarizer, AI summarization, document summary, text summary tool, content summarization",
  authors: [{ name: "Undetectable AI" }],
  creator: "Undetectable AI",
  publisher: "Undetectable AI",
  metadataBase: new URL('https://text-summarizer-lac.vercel.app'),
  openGraph: {
    title: "Text Summarizer by Undetectable AI | Summarize Text Instantly",
    description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
    url: "https://text-summarizer-lac.vercel.app",
    siteName: "Text Summarizer by Undetectable AI",
    images: [
      {
        url: "/images/logo-60px.svg",
        width: 60,
        height: 60,
        alt: "Undetectable AI Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Summarizer by Undetectable AI | Summarize Text Instantly",
    description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
    images: ["/images/logo-60px.svg"],
    creator: "@UndetectableAI"
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
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://text-summarizer-lac.vercel.app",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Text Summarizer by Undetectable AI",
              "applicationCategory": "Text Analysis Tool",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${publicSans.className} ${inter.className} antialiased`}
      >
        <Notification />
        {children}
      </body>
    </html>
  );
}
