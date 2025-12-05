import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Retacar La Aurora - Renta de Vehículos en Manta, Ecuador",
  description:
    "Renta de vehículos en La Aurora, Manta, Ecuador. Encuentra el auto perfecto para tu viaje con Diego Gualtero.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <a href="#main-content" className="skip-to-main">
          Saltar al contenido principal
        </a>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
        </Suspense>
        <main id="main-content">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
