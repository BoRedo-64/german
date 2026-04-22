import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import I18nProvider from '@/lib/i18n/I18nProvider';
import './globals.css'

export const metadata: Metadata = {
  title: 'منصة تعلم اللغة الألمانية',
  description: 'منصة حديثة لتعلم اللغة الألمانية',
  generator: 'yahya',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="dark bg-background">
      <body className="font-sans antialiased">
        <I18nProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </I18nProvider>
      </body>
    </html>
  )
}