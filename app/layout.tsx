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
  title: "Undetectable AI Text Summarizer | Summarize Text Instantly",
  description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
  keywords: "text summarizer, AI summarization, document summary, text summary tool, content summarization",
  authors: [{ name: "Undetectable AI" }],
  creator: "Undetectable AI",
  publisher: "Undetectable AI",
  openGraph: {
    title: "Undetectable AI Text Summarizer | Summarize Text Instantly",
    description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
    url: "https://undetectable.ai",
    siteName: "Undetectable AI",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Undetectable AI Text Summarizer"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undetectable AI Text Summarizer | Summarize Text Instantly",
    description: "Transform long texts into clear, concise summaries with our AI-powered text summarizer. Save time and improve comprehension with accurate text summarization.",
    images: ["/images/twitter-image.jpg"],
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
    canonical: "https://undetectable.ai",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} ${inter.className} antialiased`}
      >
        <Notification />
        {children}
      </body>
    </html>
  );
}
