import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Clock, Shield, CreditCard, Headphones, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Search Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Encuentra el auto perfecto para tu viaje
                </h1>
                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                  Renta vehículos de calidad con las mejores tarifas en Manta, Ecuador. Reserva en minutos y viaja con
                  confianza.
                </p>
              </div>

              {/* Search Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Buscar vehículos disponibles</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup-location" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                        Lugar de recogida
                      </Label>
                      <Input id="pickup-location" placeholder="La Aurora, Manta" className="w-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup-date" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                          Fecha de recogida
                        </Label>
                        <Input id="pickup-date" type="date" className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickup-time" className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                          Hora
                        </Label>
                        <Input id="pickup-time" type="time" className="w-full" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="return-date">Fecha de devolución</Label>
                        <Input id="return-date" type="date" className="w-full" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="return-time">Hora</Label>
                        <Input id="return-time" type="time" className="w-full" />
                      </div>
                    </div>

                    <Button
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      size="lg"
                      asChild
                    >
                      <Link href="/flota">
                        Buscar Vehículos
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Feature Cards */}
            <div className="grid gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/person-driving-car-on-scenic-road-with-mountains.jpg"
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Viaja con facilidad</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Renta un auto para un fin de semana o incluso un mes completo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/person-using-smartphone-to-book-car-rental.jpg"
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Renta fácil y rápida</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Compara y reserva tu vehículo en minutos desde cualquier lugar
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/calendar-with-checkmark-showing-flexible-booking.jpg"
                        alt=""
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Reserva flexible</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Reserva el mismo día o con meses de anticipación, tú decides
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">¿Por qué elegir Retacar La Aurora?</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Ofrecemos el mejor servicio de renta de vehículos en Manta con beneficios exclusivos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Seguro Completo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todos nuestros vehículos incluyen seguro completo para tu tranquilidad
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Precios Transparentes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sin cargos ocultos. El precio que ves es el precio que pagas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-success" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">Soporte 24/7</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Estamos disponibles en cualquier momento para ayudarte
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">¿Listo para tu próxima aventura?</h2>
              <p className="text-lg text-primary-foreground/90 text-pretty max-w-2xl mx-auto leading-relaxed">
                Explora nuestra flota de vehículos y encuentra el auto perfecto para tu viaje
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                asChild
              >
                <Link href="/flota">
                  Ver Flota Completa
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
