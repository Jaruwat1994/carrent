import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/layout/AuthProvider'

const sarabun = Sarabun({ subsets: ['latin', 'thai'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'CarRent - บริการเช่ารถ',
  description: 'บริการเช่ารถที่เชื่อถือได้ ราคาคุ้มค่า พร้อมให้บริการทั่วประเทศ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${sarabun.className} min-h-screen flex flex-col bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
