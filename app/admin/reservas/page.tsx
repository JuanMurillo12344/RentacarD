"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Eye, Edit, Trash2, Phone, Mail } from "lucide-react"

const reservations = [
  {
    id: 1,
    customer: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "+593 98 765 4321",
    vehicle: "Toyota Corolla 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "activa",
    total: 225,
    pickupTime: "10:00",
    returnTime: "10:00",
  },
  {
    id: 2,
    customer: "María González",
    email: "maria@ejemplo.com",
    phone: "+593 99 123 4567",
    vehicle: "Honda CR-V 2024",
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    status: "activa",
    total: 260,
    pickupTime: "14:00",
    returnTime: "14:00",
  },
  {
    id: 3,
    customer: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "+593 97 888 9999",
    vehicle: "Nissan Sentra 2024",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    status: "completada",
    total: 160,
    pickupTime: "09:00",
    returnTime: "18:00",
  },
  {
    id: 4,
    customer: "Ana Martínez",
    email: "ana@ejemplo.com",
    phone: "+593 96 555 6666",
    vehicle: "Kia Rio 2023",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "pendiente",
    total: 175,
    pickupTime: "11:00",
    returnTime: "11:00",
  },
  {
    id: 5,
    customer: "Luis Fernández",
    email: "luis@ejemplo.com",
    phone: "+593 95 444 3333",
    vehicle: "Chevrolet Spark 2024",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    status: "completada",
    total: 120,
    pickupTime: "15:00",
    returnTime: "15:00",
  },
]

export default function ReservasAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todas")

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todas" || reservation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Volver al Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Gestión de Reservas</CardTitle>
            <p className="text-muted-foreground">Administra todas las reservas de tus vehículos</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  placeholder="Buscar por cliente o vehículo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="activa">Activas</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                  <SelectItem value="completada">Completadas</SelectItem>
                  <SelectItem value="cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reservations List */}
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{reservation.customer}</h3>
                            <p className="text-sm text-muted-foreground">{reservation.vehicle}</p>
                          </div>
                          <Badge
                            variant={
                              reservation.status === "activa"
                                ? "default"
                                : reservation.status === "pendiente"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {reservation.status}
                          </Badge>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            <a href={`mailto:${reservation.email}`} className="hover:text-primary">
                              {reservation.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" aria-hidden="true" />
                            <a href={`tel:${reservation.phone}`} className="hover:text-primary">
                              {reservation.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Recogida: </span>
                            <span className="font-medium">
                              {reservation.startDate} {reservation.pickupTime}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Devolución: </span>
                            <span className="font-medium">
                              {reservation.endDate} {reservation.returnTime}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total: </span>
                            <span className="font-semibold text-primary">${reservation.total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none bg-transparent">
                          <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none bg-transparent">
                          <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none text-destructive hover:text-destructive bg-transparent"
                        >
                          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReservations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron reservas</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
