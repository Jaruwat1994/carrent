import mongoose, { Schema, Document } from 'mongoose'

export interface IRental extends Document {
  rentalCode: string
  vehicleId: mongoose.Types.ObjectId
  customerId: mongoose.Types.ObjectId
  startDate: Date
  endDate: Date
  actualReturnDate?: Date
  totalPrice: number
  deposit: number
  additionalFees: number
  pickupLocation?: string
  returnLocation?: string
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'overdue'
  contractImage?: string
  pickupImage?: string
  returnImage?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const RentalSchema = new Schema<IRental>(
  {
    rentalCode: { type: String, required: true, unique: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    actualReturnDate: { type: Date },
    totalPrice: { type: Number, required: true },
    deposit: { type: Number, default: 0 },
    additionalFees: { type: Number, default: 0 },
    pickupLocation: { type: String },
    returnLocation: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'overdue'],
      default: 'pending',
    },
    contractImage: { type: String },
    pickupImage: { type: String },
    returnImage: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
)

export const Rental = mongoose.models.Rental || mongoose.model<IRental>('Rental', RentalSchema)
