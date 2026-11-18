// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Portfolio Georgia Chalkia',
    description: 'En portfolio för legitimerad sjuksköterska Georgia Chalkia',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        // UPPDATERING: Lägg till className={inter.className} här för att använda typsnittet
        <html lang="sv" className={inter.className}>
        <body>{children}</body>
        </html>
    );
}