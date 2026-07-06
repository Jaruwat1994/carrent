import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/layout/AuthProvider'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

const sarabun = Sarabun({ subsets: ['latin', 'thai'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Carallcar - บริการเช่ารถ',
  description: 'บริการเช่ารถที่เชื่อถือได้ ราคาคุ้มค่า พร้อมให้บริการทั่วประเทศ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={sarabun.className} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
