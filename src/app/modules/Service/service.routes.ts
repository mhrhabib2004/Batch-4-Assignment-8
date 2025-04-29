
import express from 'express';
import { serviceController } from './service.controller';
import validateRequest from '../../utils/validateRequest';
import { serviceValidation } from './service.validation';

const router = express.Router();


// Create bike route
router.post(
    "/",
    validateRequest(serviceValidation.createServiceValidation),
    serviceController.createService
);


// get all service route
router.get(
    '/',
    serviceController.getAllService
);


// service data befor 7 days and filter panding & in_progress route
router.get(
    '/status',
    serviceController.getPendingOrOverdueServices
);


// get service ID 
router.get(
    '/:serviceId',
    serviceController.getByServiceId
);


// complet service route
router.put(
    '/:serviceId/complete',
    serviceController.completeService
);




export const ServiceRoutes = router;
