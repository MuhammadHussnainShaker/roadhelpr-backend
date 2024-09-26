import mongoose, { Schema } from 'mongoose'

const serviceRequestSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
    },
    { timestamps: true }
)

export const ServiceRequest = mongoose.model(
    'ServiceRequest',
    serviceRequestSchema
)
