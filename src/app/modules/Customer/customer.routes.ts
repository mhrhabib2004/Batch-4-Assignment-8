

import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { customerValidation } from './customer.validation';
import { customerController } from './customer.controller';


const router = express.Router();


// Create customer route
router.post(
    "/create-customer",
    validateRequest(customerValidation.createCustomerValidation),
    customerController.createCustomer
);


// get all customer route
router.get(
    '/',
    customerController.getAllCustomer
);

// get customer ID 
router.get(
    '/:customerId',
    customerController.getByCustomerId
);


// Update customer route
router.patch(
    '/:customerId',
    validateRequest(customerValidation.updateCustomerValidation),
    customerController.updateCustomer
);

// Delete Customer route
router.delete(
    '/:customerId',
    customerController.deleteCustomer
);



export const customerRoutes = router;