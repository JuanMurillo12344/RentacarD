"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Users, Briefcase, Fuel, Gauge, Shield, CheckCircle2, ArrowLeft, Calendar, Edit, Trash2 } from "lucide-react"
import { getVehicleById, deleteVehicle } from "@/lib/vehicles"
import { useToast } from "@/hooks/use-toast"

export default function VehiculoDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const vehicleData = getVehicleById(Number.parseInt(params.id))
    setVehicle(vehicleData)
    setLoading(false)
  }, [params.id])

  const handleDelete = () => {
    const success = deleteVehicle(Number.parseInt(params.id))
    if (success) {
      toast({
        title: "Vehículo eliminado",
        description: "El vehículo ha sido eliminado exitosamente.",
      })
      router.push("/flota")
    } else {
      toast({
        title: "Error",
        description: "No se pudo eliminar el vehículo.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Vehículo no encontrado</h1>
          <Button asChild>
            <Link href="/flota">Volver a la Flota</Link>
          </Button>
        </div>
      </div>
    )
  }

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

  const features = vehicle.features.split(",").map((f: string) => f.trim())
  const included = [
    "Seguro completo",
    "Kilometraje ilimitado",
    "Asistencia en carretera 24/7",
    "GPS incluido",
    "Segundo conductor sin cargo",
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/flota">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Volver a la flota
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={`${vehicle.name} - ${getCategoryLabel(vehicle.category)}`}
                  fill
                  className="object-cover"
                  priority
                />
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground hover:bg-background">
                  {getCategoryLabel(vehicle.category)}
                </Badge>
              </div>
            </Card>

            {/* Admin Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/admin/vehiculo/editar/${vehicle.id}`}>
                  <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                  Editar Vehículo
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-destructive hover:text-destructive bg-transparent">
                    <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Eliminar Vehículo
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. El vehículo "{vehicle.name}" será eliminado permanentemente de
                      la flota.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Details */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
                  <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
                </div>

                <Separator />

                {/* Specifications */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Especificaciones</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pasajeros</p>
                        <p className="font-medium">{vehicle.passengers} personas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Equipaje</p>
                        <p className="font-medium">{vehicle.luggage} maletas</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Transmisión</p>
                        <p className="font-medium">{getTransmissionLabel(vehicle.transmission)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fuel className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Combustible</p>
                        <p className="font-medium">{getFuelLabel(vehicle.fuel)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Año</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-muted-foreground">Color</p>
                        <p className="font-medium">{vehicle.color}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Características</h2>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature: string) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Included */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" aria-hidden="true" />
                    Incluido en el precio
                  </h2>
                  <ul className="space-y-2">
                    {included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Precio por día</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">${vehicle.price}</span>
                    <span className="text-muted-foreground">USD</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <p className="text-sm font-medium">Información de contacto</p>
                    <p className="text-sm text-muted-foreground">Diego Gualtero</p>
                    <a
                      href="tel:+593967781785"
                      className="text-sm text-primary hover:underline flex items-center gap-2"
                    >
                      +593 96 778 1785
                    </a>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    asChild
                  >
                    <Link href={`/reserva/${vehicle.id}`}>
                      <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                      Reservar Ahora
                    </Link>
                  </Button>

                  <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/contacto">Contactar al propietario</Link>
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" aria-hidden="true" />
                    Garantía de calidad
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Todos nuestros vehículos están en excelente estado y cuentan con seguro completo para tu
                    tranquilidad.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
