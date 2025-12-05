"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Banknote, CheckCircle2 } from "lucide-react"

const vehicles = [
  { id: 1, name: "Toyota Corolla 2024", price: 45 },
  { id: 2, name: "Honda CR-V 2024", price: 65 },
  { id: 3, name: "Nissan Sentra 2024", price: 40 },
  { id: 4, name: "Kia Rio 2023", price: 35 },
  { id: 5, name: "Chevrolet Spark 2024", price: 30 },
  { id: 6, name: "Suzuki Swift 2023", price: 32 },
]

export default function PagoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const days = Number.parseInt(searchParams.get("days") || "1")
  const vehicle = vehicles.find((v) => v.id === Number.parseInt(params.id))
  const [paymentMethod, setPaymentMethod] = useState("card")

  if (!vehicle) {
    return <div>Vehículo no encontrado</div>
  }

  const total = vehicle.price * days

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/confirmacion")
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link href={`/reserva/${vehicle.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Volver a la reserva
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                  Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Selecciona tu método de pago</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-primary" aria-hidden="true" />
                          <div>
                            <p className="font-medium">Tarjeta de Crédito/Débito</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5 text-success" aria-hidden="true" />
                          <div>
                            <p className="font-medium">Transferencia Bancaria</p>
                            <p className="text-sm text-muted-foreground">Pago directo a cuenta bancaria</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Banknote className="h-5 w-5 text-secondary" aria-hidden="true" />
                          <div>
                            <p className="font-medium">Efectivo</p>
                            <p className="text-sm text-muted-foreground">Pago en efectivo al recoger el vehículo</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {/* Card Payment Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Información de la Tarjeta</h3>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                        <Input id="cardName" placeholder="JUAN PEREZ" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de expiración</Label>
                          <Input id="expiry" placeholder="MM/AA" maxLength={5} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" maxLength={4} required />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Transfer Payment Info */}
                  {paymentMethod === "transfer" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Información Bancaria</h3>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Banco:</span> Banco Pichincha
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Cuenta:</span> 1234567890
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Titular:</span> Diego Gualtero
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Tipo:</span> Cuenta Corriente
                        </p>
                        <Separator className="my-2" />
                        <p className="text-xs text-muted-foreground">
                          Por favor, envía el comprobante de pago a WhatsApp +593 96 778 1785 o correo
                          diego.gualtero@retacarlaaurora.com
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Cash Payment Info */}
                  {paymentMethod === "cash" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Pago en Efectivo</h3>
                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                        <p className="text-sm leading-relaxed">
                          Podrás realizar el pago en efectivo al momento de recoger el vehículo en nuestra ubicación en
                          La Aurora, Manta, Ecuador.
                        </p>
                        <Separator className="my-2" />
                        <p className="text-xs text-muted-foreground">
                          Se requiere un depósito de garantía que será devuelto al finalizar el período de renta.
                          Contacta a Diego Gualtero al +593 96 778 1785 para coordinar la entrega.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Confirmar Reserva
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumen del Pago</CardTitle>
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
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${total}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">Total a Pagar</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${total}</span>
                      <p className="text-xs text-muted-foreground">USD</p>
                    </div>
                  </div>

                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      Incluye seguro completo, kilometraje ilimitado y asistencia 24/7
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
