// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
    title: 'Georgia Chalkia | Distriktssköterska & HealthTech',
    description: 'Georgia Chalkia – legitimerad distriktssköterska med klinisk erfarenhet och kunskap i systemutveckling, inriktad mot HealthTech och digital vård.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="sv" className={`${inter.variable} ${playfair.variable}`}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
