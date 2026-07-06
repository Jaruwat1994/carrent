import mongoose, { Schema } from 'mongoose'

export interface IPaymentMethod {
  _id: mongoose.Types.ObjectId
  type: 'bank_transfer' | 'promptpay'
  bankName?: string
  accountNumber: string
  accountName: string
  qrCodeUrl?: string
  isActive: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

const PaymentMethodSchema = new Schema<IPaymentMethod>(
  {
    type: { type: String, enum: ['bank_transfer', 'promptpay'], required: true },
    bankName: { type: String },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    qrCodeUrl: { type: String },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const PaymentMethod = mongoose.models.PaymentMethod || mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema)
