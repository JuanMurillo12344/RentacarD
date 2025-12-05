"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Save } from "lucide-react"
import { addVehicle } from "@/lib/vehicles"
import { useToast } from "@/hooks/use-toast"

export default function NuevoVehiculoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        image: formData.image || "/placeholder.svg?height=400&width=600",
      }

      addVehicle(vehicleData)

      toast({
        title: "Vehículo agregado",
        description: "El vehículo se ha agregado exitosamente a la flota.",
      })

      router.push("/flota")
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al agregar el vehículo. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/flota">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Volver a la flota
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Agregar Nuevo Vehículo</CardTitle>
            <p className="text-muted-foreground">Completa la información del vehículo para agregarlo a la flota</p>
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
                      placeholder="Ej: Toyota Corolla 2024"
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
                    placeholder="Describe las características principales del vehículo..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Año *</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2024"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color *</Label>
                    <Input
                      id="color"
                      placeholder="Ej: Plateado"
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
                      placeholder="45"
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
                      placeholder="5"
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
                      placeholder="3"
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
                      placeholder="4"
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
                    placeholder="Ej: Aire Acondicionado, Bluetooth, Cámara Trasera"
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
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Ingresa la URL de la imagen del vehículo</p>
                </div>

                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground mb-2">O arrastra y suelta una imagen aquí</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG hasta 10MB</p>
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
                  {isSubmitting ? "Guardando..." : "Guardar Vehículo"}
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
