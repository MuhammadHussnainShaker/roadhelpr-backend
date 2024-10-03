import mongoose, { Schema } from 'mongoose'

const serviceProviderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            default: 4,
            min: 0,
            max: 5,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // reviews: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Review',
        //     },
        // ],
        longitude: {
            type: Number,
            default: 74.3437,
        },
        latitude: {
            type: Number,
            default: 31.5546,
        },
    },
    { timestamps: true }
)

export const ServiceProvider = mongoose.model(
    'ServiceProvider',
    serviceProviderSchema
)
