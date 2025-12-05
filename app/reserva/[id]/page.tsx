"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, ArrowLeft, CreditCard } from "lucide-react"

const vehicles = [
  { id: 1, name: "Toyota Corolla 2024", price: 45 },
  { id: 2, name: "Honda CR-V 2024", price: 65 },
  { id: 3, name: "Nissan Sentra 2024", price: 40 },
  { id: 4, name: "Ford Explorer 2024", price: 85 },
  { id: 5, name: "Chevrolet Spark 2024", price: 30 },
  { id: 6, name: "BMW X3 2024", price: 120 },
]

export default function ReservaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const vehicle = vehicles.find((v) => v.id === Number.parseInt(params.id))
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [days, setDays] = useState(0)

  if (!vehicle) {
    return <div>Vehículo no encontrado</div>
  }

  const calculateDays = (pickup: string, returnD: string) => {
    if (pickup && returnD) {
      const start = new Date(pickup)
      const end = new Date(returnD)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/pago/${vehicle.id}?days=${days}`)
  }

  const total = vehicle.price * days

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link href={`/vehiculo/${vehicle.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Volver al vehículo
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" aria-hidden="true" />
                  Detalles de la Reserva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Información Personal</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input id="firstName" placeholder="Juan" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input id="lastName" placeholder="Pérez" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input id="email" type="email" placeholder="juan@ejemplo.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="+593 96 778 1785" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="license">Número de Licencia</Label>
                      <Input id="license" placeholder="EC-1234567890" required />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Fechas de Renta</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupDate">Fecha de Recogida</Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={pickupDate}
                          onChange={(e) => {
                            setPickupDate(e.target.value)
                            calculateDays(e.target.value, returnDate)
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnDate">Fecha de Devolución</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={returnDate}
                          onChange={(e) => {
                            setReturnDate(e.target.value)
                            calculateDays(pickupDate, e.target.value)
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupTime">Hora de Recogida</Label>
                        <Input id="pickupTime" type="time" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnTime">Hora de Devolución</Label>
                        <Input id="returnTime" type="time" required />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    disabled={days === 0}
                  >
                    <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
                    Continuar al Pago
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vehículo</p>
                    <p className="font-semibold">{vehicle.name}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Precio por día</span>
                      <span className="font-medium">${vehicle.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Número de días</span>
                      <span className="font-medium">{days}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${total}</span>
                      <p className="text-xs text-muted-foreground">USD</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      El precio incluye seguro completo, kilometraje ilimitado y asistencia en carretera 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
