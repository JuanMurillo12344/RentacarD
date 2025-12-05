export interface Vehicle {
  id: number
  name: string
  category: string
  description: string
  year: number
  color: string
  price: number
  passengers: number
  luggage: number
  transmission: string
  fuel: string
  doors: number
  features: string
  image: string
}

const defaultVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Corolla 2024",
    category: "sedan",
    description: "Sedán confiable y eficiente",
    year: 2024,
    color: "Plateado",
    price: 45,
    passengers: 5,
    luggage: 3,
    transmission: "automatico",
    fuel: "gasolina",
    doors: 4,
    features: "Aire Acondicionado, Bluetooth, Cámara Trasera, Control de Crucero, USB",
    image: "/silver-toyota-corolla-2024-sedan-modern-elegant.jpg",
  },
  {
    id: 2,
    name: "Honda CR-V 2024",
    category: "suv",
    description: "SUV espaciosa ideal para familias",
    year: 2024,
    color: "Blanco",
    price: 65,
    passengers: 7,
    luggage: 5,
    transmission: "automatico",
    fuel: "gasolina",
    doors: 5,
    features: "4x4, Aire Acondicionado, Sistema de Navegación, Asientos de Cuero, Bluetooth",
    image: "/white-honda-crv-2024-suv-modern-spacious.jpg",
  },
  {
    id: 3,
    name: "Nissan Sentra 2024",
    category: "sedan",
    description: "Sedán compacto perfecto para la ciudad",
    year: 2024,
    color: "Azul",
    price: 40,
    passengers: 5,
    luggage: 2,
    transmission: "automatico",
    fuel: "gasolina",
    doors: 4,
    features: "Aire Acondicionado, USB, Control Crucero, Bluetooth, Cámara Trasera",
    image: "/blue-nissan-sentra-2024-compact-sedan-modern.jpg",
  },
  {
    id: 4,
    name: "Kia Rio 2023",
    category: "compacto",
    description: "Sedán compacto ideal para la ciudad",
    year: 2023,
    color: "Blanco",
    price: 35,
    passengers: 5,
    luggage: 2,
    transmission: "manual",
    fuel: "gasolina",
    doors: 4,
    features: "Aire Acondicionado, Radio, USB, Dirección Asistida, Económico",
    image: "/white-kia-rio-2023-compact-sedan-efficient.jpg",
  },
  {
    id: 5,
    name: "Chevrolet Spark 2024",
    category: "compacto",
    description: "Auto perfecto para moverse por la ciudad",
    year: 2024,
    color: "Rojo",
    price: 30,
    passengers: 4,
    luggage: 2,
    transmission: "manual",
    fuel: "gasolina",
    doors: 5,
    features: "Aire Acondicionado, Radio, Económico, USB, Dirección Asistida",
    image: "/red-chevrolet-spark-2024-mini-compact-car-city.jpg",
  },
  {
    id: 6,
    name: "Suzuki Swift 2023",
    category: "hatchback",
    description: "Hatchback versátil y económico",
    year: 2023,
    color: "Azul",
    price: 32,
    passengers: 5,
    luggage: 2,
    transmission: "manual",
    fuel: "gasolina",
    doors: 5,
    features: "Aire Acondicionado, USB, Bluetooth, Económico, Dirección Asistida",
    image: "/blue-suzuki-swift-2023-hatchback-compact-city.jpg",
  },
]

export function getVehicles(): Vehicle[] {
  if (typeof window === "undefined") return defaultVehicles

  const stored = localStorage.getItem("vehicles")
  if (!stored) {
    localStorage.setItem("vehicles", JSON.stringify(defaultVehicles))
    return defaultVehicles
  }
  return JSON.parse(stored)
}

export function getVehicleById(id: number): Vehicle | undefined {
  const vehicles = getVehicles()
  return vehicles.find((v) => v.id === id)
}

export function addVehicle(vehicle: Omit<Vehicle, "id">): Vehicle {
  const vehicles = getVehicles()
  const newId = Math.max(...vehicles.map((v) => v.id), 0) + 1
  const newVehicle = { ...vehicle, id: newId }
  vehicles.push(newVehicle)
  localStorage.setItem("vehicles", JSON.stringify(vehicles))
  return newVehicle
}

export function updateVehicle(id: number, vehicle: Omit<Vehicle, "id">): Vehicle | null {
  const vehicles = getVehicles()
  const index = vehicles.findIndex((v) => v.id === id)
  if (index === -1) return null

  const updatedVehicle = { ...vehicle, id }
  vehicles[index] = updatedVehicle
  localStorage.setItem("vehicles", JSON.stringify(vehicles))
  return updatedVehicle
}

export function deleteVehicle(id: number): boolean {
  const vehicles = getVehicles()
  const filtered = vehicles.filter((v) => v.id !== id)
  if (filtered.length === vehicles.length) return false

  localStorage.setItem("vehicles", JSON.stringify(filtered))
  return true
}
