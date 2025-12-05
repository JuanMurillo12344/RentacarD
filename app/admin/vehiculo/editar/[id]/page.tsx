"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { getVehicleById, updateVehicle } from "@/lib/vehicles"
import { useToast } from "@/hooks/use-toast"

export default function EditarVehiculoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    year: "",
    color: "",
    price: "",
    passengers: "",
    luggage: "",
    transmission: "",
    fuel: "",
    doors: "",
    features: "",
    image: "",
  })

  useEffect(() => {
    const vehicle = getVehicleById(Number.parseInt(params.id))
    if (vehicle) {
      setFormData({
        name: vehicle.name,
        category: vehicle.category,
        description: vehicle.description,
        year: vehicle.year.toString(),
        color: vehicle.color,
        price: vehicle.price.toString(),
        passengers: vehicle.passengers.toString(),
        luggage: vehicle.luggage.toString(),
        transmission: vehicle.transmission,
        fuel: vehicle.fuel,
        doors: vehicle.doors.toString(),
        features: vehicle.features,
        image: vehicle.image,
      })
    }
    setLoading(false)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const vehicleData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        year: Number.parseInt(formData.year),
        color: formData.color,
        price: Number.parseFloat(formData.price),
        passengers: Number.parseInt(formData.passengers),
        luggage: Number.parseInt(formData.luggage),
        transmission: formData.transmission,
        fuel: formData.fuel,
        doors: Number.parseInt(formData.doors),
        features: formData.features,
        image: formData.image,
      }

      const updated = updateVehicle(Number.parseInt(params.id), vehicleData)

      if (updated) {
        toast({
          title: "Vehículo actualizado",
          description: "Los cambios se han guardado exitosamente.",
        })
        router.push("/flota")
      } else {
        throw new Error("No se pudo actualizar el vehículo")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el vehículo. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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

  if (!formData.name) {
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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/flota">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Volver a la Flota
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Editar Vehículo</CardTitle>
            <p className="text-muted-foreground">Actualiza la información del vehículo</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Básica */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Información Básica</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Vehículo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedán</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="compacto">Compacto</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Año *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color *</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Precio por día (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Especificaciones */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Especificaciones</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Número de Pasajeros *</Label>
                    <Input
                      id="passengers"
                      type="number"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="luggage">Capacidad de Equipaje *</Label>
                    <Input
                      id="luggage"
                      type="number"
                      value={formData.luggage}
                      onChange={(e) => setFormData({ ...formData, luggage: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmisión *</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                      required
                    >
                      <SelectTrigger id="transmission">
                        <SelectValue placeholder="Selecciona transmisión" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatico">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuel">Tipo de Combustible *</Label>
                    <Select
                      value={formData.fuel}
                      onValueChange={(value) => setFormData({ ...formData, fuel: value })}
                      required
                    >
                      <SelectTrigger id="fuel">
                        <SelectValue placeholder="Selecciona combustible" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gasolina">Gasolina</SelectItem>
                        <SelectItem value="diesel">Diésel</SelectItem>
                        <SelectItem value="hibrido">Híbrido</SelectItem>
                        <SelectItem value="electrico">Eléctrico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doors">Número de Puertas *</Label>
                    <Input
                      id="doors"
                      type="number"
                      value={formData.doors}
                      onChange={(e) => setFormData({ ...formData, doors: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Características */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Características</h3>
                <div className="space-y-2">
                  <Label htmlFor="features">Características (separadas por coma)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Ingresa las características separadas por comas</p>
                </div>
              </div>

              {/* Imagen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Imagen del Vehículo</h3>
                <div className="space-y-2">
                  <Label htmlFor="image">URL de la Imagen</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" aria-hidden="true" />
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/flota")}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
