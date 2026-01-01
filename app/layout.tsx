import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Şirketiniz - Profesyonel İş Çözümleri",
  description: "İşletmenizi geleceğe taşıyan profesyonel çözümler ve danışmanlık hizmetleri",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={fontSans.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
