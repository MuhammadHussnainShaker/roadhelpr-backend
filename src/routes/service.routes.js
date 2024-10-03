import { Router } from 'express'
import { createServiceRequest } from '../controllers/serviceRequest.controller.js'

const router = Router()

router.route('/create-service-request').post(createServiceRequest)

export default router
