"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Car, Calendar, DollarSign, Users, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { getVehicles, deleteVehicle } from "@/lib/vehicles"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para reservas - en producción vendrían de una base de datos
const recentReservations = [
  {
    id: 1,
    customer: "Juan Pérez",
    vehicle: "Toyota Corolla 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "activa",
    total: 225,
  },
  {
    id: 2,
    customer: "María González",
    vehicle: "Honda CR-V 2024",
    startDate: "2024-01-18",
    endDate: "2024-01-22",
    status: "activa",
    total: 260,
  },
  {
    id: 3,
    customer: "Carlos Rodríguez",
    vehicle: "Nissan Sentra 2024",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    status: "completada",
    total: 160,
  },
]

export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeReservations: 3,
    monthlyRevenue: 1250,
    totalCustomers: 12,
  })

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = () => {
    const vehicleData = getVehicles()
    setVehicles(vehicleData)
    setStats((prev) => ({ ...prev, totalVehicles: vehicleData.length }))
  }

  const handleDelete = (id: number, name: string) => {
    const success = deleteVehicle(id)
    if (success) {
      toast({
        title: "Vehículo eliminado",
        description: `${name} ha sido eliminado exitosamente.`,
      })
      loadVehicles()
    } else {
      toast({
        title: "Error",
        description: "No se pudo eliminar el vehículo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona tu negocio de renta de autos - Diego Gualtero</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehículos</CardTitle>
              <Car className="h-4 w-4 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalVehicles}</div>
              <p className="text-xs text-muted-foreground mt-1">En la flota</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reservas Activas</CardTitle>
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeReservations}</div>
              <p className="text-xs text-muted-foreground mt-1">En curso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${stats.monthlyRevenue}</div>
              <p className="text-xs text-muted-foreground mt-1">USD este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registrados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Reservations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Reservas Recientes</CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/reservas">Ver todas</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{reservation.customer}</p>
                      <p className="text-sm text-muted-foreground">{reservation.vehicle}</p>
                      <p className="text-xs text-muted-foreground">
                        {reservation.startDate} - {reservation.endDate}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={reservation.status === "activa" ? "default" : "secondary"}>
                        {reservation.status}
                      </Badge>
                      <p className="text-sm font-semibold">${reservation.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestión de Vehículos</CardTitle>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                <Link href="/admin/vehiculo/nuevo">
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  Agregar
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {vehicles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-4">No hay vehículos registrados</p>
                  <Button asChild>
                    <Link href="/admin/vehiculo/nuevo">Agregar primer vehículo</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{vehicle.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="text-xs">
                            disponible
                          </Badge>
                          <span className="text-xs text-muted-foreground">${vehicle.price}/día</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/vehiculo/${vehicle.id}`}>
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Ver detalles</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/admin/vehiculo/editar/${vehicle.id}`}>
                            <Edit className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              <span className="sr-only">Eliminar</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. El vehículo "{vehicle.name}" será eliminado
                                permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(vehicle.id, vehicle.name)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
