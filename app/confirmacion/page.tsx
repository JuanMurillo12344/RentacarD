import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Phone, Mail, Home } from "lucide-react"

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">¡Reserva Confirmada!</h1>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  Tu reserva ha sido procesada exitosamente. Recibirás un correo electrónico con todos los detalles de
                  tu reserva.
                </p>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-muted/50 rounded-lg space-y-4">
                <p className="font-semibold">Información de Contacto</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Diego Gualtero</p>
                  <a
                    href="tel:+593967781785"
                    className="text-sm text-primary hover:underline flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    +593 96 778 1785
                  </a>
                  <a
                    href="mailto:diego@retacarlaaurora.com"
                    className="text-sm text-primary hover:underline flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    diego@retacarlaaurora.com
                  </a>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Si tienes alguna pregunta, no dudes en contactarnos. Estamos disponibles 24/7 para ayudarte.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                    Volver al Inicio
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/flota">Ver Más Vehículos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
