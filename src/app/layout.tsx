import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { PasswordGate } from '@/components/PasswordGate';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Shayan Mirzazadeh - Account Manager',
  description: 'Account Manager specializing in expansions and renewals. Moving from Toronto to Dubai, focused on measurable ROI and executive alignment.',
  keywords: ['Account Manager', 'Sales', 'Expansion', 'Renewals', 'Dubai', 'Toronto', 'SaaS'],
  authors: [{ name: 'Shayan Mirzazadeh' }],
  openGraph: {
    title: 'Shayan Mirzazadeh - Account Manager',
    description: 'Account Manager specializing in expansions and renewals. Moving from Toronto to Dubai.',
    url: 'https://shayan-resume.vercel.app',
    siteName: 'Shayan Mirzazadeh',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shayan Mirzazadeh - Account Manager',
    description: 'Account Manager specializing in expansions and renewals. Moving from Toronto to Dubai.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="preload" 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700&display=swap" 
          as="style"
        />
        <link 
          rel="stylesheet" 
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700&display=swap" 
        />
      </head>
      <body className={cn(
        inter.variable,
        'min-h-screen bg-background font-sans antialiased grain'
      )}>
        <PasswordGate>
          <Header />
          <main className="pt-20">
            {children}
          </main>
        </PasswordGate>
      </body>
    </html>
  );
}