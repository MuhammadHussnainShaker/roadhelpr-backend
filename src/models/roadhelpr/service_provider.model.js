import mongoose, { Schema } from 'mongoose'

const serviceProviderSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
}, { timestamps: true })

export const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema)