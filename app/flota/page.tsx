"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Fuel, Gauge, ArrowRight, Plus } from "lucide-react"
import { getVehicles, type Vehicle } from "@/lib/vehicles"

export default function FlotaPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    setVehicles(getVehicles())
  }, [])

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      sedan: "Sedán",
      suv: "SUV",
      compacto: "Compacto",
      hatchback: "Hatchback",
      pickup: "Pickup",
    }
    return labels[category] || category
  }

  const getTransmissionLabel = (transmission: string) => {
    return transmission === "automatico" ? "Automático" : "Manual"
  }

  const getFuelLabel = (fuel: string) => {
    const labels: Record<string, string> = {
      gasolina: "Gasolina",
      diesel: "Diésel",
      hibrido: "Híbrido",
      electrico: "Eléctrico",
    }
    return labels[fuel] || fuel
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Gestión de Flota</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-3xl leading-relaxed mt-2">
                Administra todos los vehículos disponibles para renta en Retacar La Aurora
              </p>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg" asChild>
              <Link href="/admin/vehiculo/nuevo">
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                Agregar Vehículo
              </Link>
            </Button>
          </div>
        </div>

        {/* Vehicle Grid */}
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hay vehículos registrados</p>
            <Button asChild>
              <Link href="/admin/vehiculo/nuevo">Agregar primer vehículo</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={`${vehicle.name} - ${getCategoryLabel(vehicle.category)}`}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-background/90 text-foreground hover:bg-background">
                      {getCategoryLabel(vehicle.category)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">${vehicle.price}</span>
                      <span className="text-sm text-muted-foreground">/ día</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>{vehicle.passengers} pasajeros</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>{vehicle.luggage} maletas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>{getTransmissionLabel(vehicle.transmission)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span>{getFuelLabel(vehicle.fuel)}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Características:</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features
                        .split(",")
                        .slice(0, 3)
                        .map((feature) => (
                          <Badge key={feature.trim()} variant="secondary" className="text-xs">
                            {feature.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 gap-2">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                    <Link href={`/vehiculo/${vehicle.id}`}>
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/admin/vehiculo/editar/${vehicle.id}`}>Editar</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
