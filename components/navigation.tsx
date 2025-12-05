"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Menu, X, LayoutDashboard } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
          >
            <Car className="h-6 w-6 text-primary" aria-hidden="true" />
            <span>Retacar La Aurora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1 flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
            <Link
              href="/flota"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              Flota
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              Contacto
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Dashboard
              </Link>
              <Link
                href="/flota"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Flota
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Contacto
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
