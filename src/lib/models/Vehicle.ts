import mongoose, { Schema } from 'mongoose'

export interface IVehicle {
  _id: mongoose.Types.ObjectId
  licensePlate: string
  brand: string
  model: string
  year: number
  seats: number
  color: string
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic'
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  description?: string
  images: string[]
  features: string[]
  status: 'available' | 'rented' | 'maintenance' | 'unavailable'
  location?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const VehicleSchema = new Schema<IVehicle>(
  {
    licensePlate: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    seats: { type: Number, required: true },
    color: { type: String, required: true },
    fuelType: { type: String, enum: ['gasoline', 'diesel', 'hybrid', 'electric'], default: 'gasoline' },
    transmission: { type: String, enum: ['manual', 'automatic'], default: 'automatic' },
    pricePerDay: { type: Number, required: true },
    pricePerWeek: { type: Number, required: true },
    pricePerMonth: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    features: [{ type: String }],
    status: { type: String, enum: ['available', 'rented', 'maintenance', 'unavailable'], default: 'available' },
    location: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Vehicle = mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema)
