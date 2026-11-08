import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ProxiService | Local help, made human',
  description: 'Find trusted local mechanics, cleaners, electricians, plumbers, painters, and carpenters.',
};

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-sand text-ink antialiased selection:bg-tomato selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
