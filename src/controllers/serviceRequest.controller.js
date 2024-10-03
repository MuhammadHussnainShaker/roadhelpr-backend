import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ServiceRequest } from '../models/roadhelpr/serviceRequest.model.js'

const createServiceRequest = asyncHandler(async (req, res) => {
    // take location coords and customer id from req.body
    // create serviceRequest model
    // boradcast it to all serviceProviders

    const { longitude, latitude } = req.body

    const serviceRequest = await ServiceRequest.create({
        longitude,
        latitude,
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                serviceRequest,
                'Service Request created successfully'
            )
        )
})

export { createServiceRequest }
