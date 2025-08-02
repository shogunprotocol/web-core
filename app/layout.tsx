import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/global.scss';
import { RootProvider } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shōgun - AI-Powered DeFi Yield Optimization',
  description:
    'Maximize your yields with intelligent DeFi strategies. Ice cold decision making, no fear, no FOMO.',
  keywords:
    'DeFi, AI, yield optimization, samurai, ronin council, crypto, blockchain, CoreDAO',
  authors: [{ name: 'Shōgun Team' }],
  creator: 'Shōgun',
  publisher: 'Shōgun',
  robots: 'index, follow',
  openGraph: {
    title: 'Shōgun - AI-Powered DeFi Yield Optimization',
    description:
      'Maximize your yields with intelligent DeFi strategies. Ice cold decision making, no fear, no FOMO.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shōgun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shōgun - AI-Powered DeFi Yield Optimization',
    description:
      'Maximize your yields with intelligent DeFi strategies. Ice cold decision making, no fear, no FOMO.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#44FBDE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/basement/BasementGrotesque-Black_v1.202.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/aeonik/Aeonik-Pro-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
