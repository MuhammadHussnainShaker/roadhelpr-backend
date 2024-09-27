import mongoose, { Schema } from 'mongoose'

const serviceRequestSchema = new Schema(
    {
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        serviceProviderId: {
            type: Schema.Types.ObjectId,
            ref: 'ServiceProvider',
        },
        longitude: {
            type: Number,
            default: 0,
        },
        latitude: {
            type: Number,
            default: 0,
        },
        completionTime: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'rejected', 'accepted', 'completed', 'cancelled'],
            default: 'pending',
        },
        paymentId: {
            type: Schema.Types.ObjectId,
            ref: 'Payment',
        },
        reviewId: {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    },
    { timestamps: true }
)

export const ServiceRequest = mongoose.model(
    'ServiceRequest',
    serviceRequestSchema
)
