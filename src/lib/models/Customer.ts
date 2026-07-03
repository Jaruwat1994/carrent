import mongoose, { Schema, Document } from 'mongoose'

export interface ICustomer extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  idCardNumber: string
  drivingLicenseNumber: string
  birthDate?: Date
  address?: string
  city?: string
  province?: string
  postalCode?: string
  drivingLicenseExpiry?: Date
  idCardImage?: string
  drivingLicenseImage?: string
  status: 'active' | 'inactive' | 'blacklisted'
  createdAt: Date
  updatedAt: Date
}

const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    idCardNumber: { type: String, required: true, unique: true },
    drivingLicenseNumber: { type: String, required: true, unique: true },
    birthDate: { type: Date },
    address: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
    drivingLicenseExpiry: { type: Date },
    idCardImage: { type: String },
    drivingLicenseImage: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'blacklisted'], default: 'active' },
  },
  { timestamps: true }
)

export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)
