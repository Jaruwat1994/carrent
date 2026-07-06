import mongoose, { Schema } from 'mongoose'

export interface ICarouselSlide {
  _id: mongoose.Types.ObjectId
  title: string
  subtitle: string
  imageUrl: string
  priceLabel: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CarouselSlideSchema = new Schema<ICarouselSlide>(
  {
    title:      { type: String, required: true },
    subtitle:   { type: String, default: '' },
    imageUrl:   { type: String, required: true },
    priceLabel: { type: String, default: '' },
    order:      { type: Number, default: 0 },
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const CarouselSlide =
  mongoose.models.CarouselSlide ||
  mongoose.model<ICarouselSlide>('CarouselSlide', CarouselSlideSchema)
