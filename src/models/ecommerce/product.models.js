import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
})

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [imageSchema],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

export const Product = mongoose.model('Product', productSchema)
