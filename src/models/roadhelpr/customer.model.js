import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

export const Customer = mongoose.model('Customer', customerSchema)
