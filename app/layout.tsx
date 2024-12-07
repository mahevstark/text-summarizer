import type { Metadata } from "next";
import "./globals.css";
import { Inter, Public_Sans } from 'next/font/google'
import Notification from './components/Notification'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });


const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ['latin'],
});
const inter = Inter({
  
  subsets: ['latin'],
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "Text Summarizer",
  description: "Text Summarizer Task",
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
