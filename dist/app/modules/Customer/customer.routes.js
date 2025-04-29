"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const customer_validation_1 = require("./customer.validation");
const customer_controller_1 = require("./customer.controller");
const router = express_1.default.Router();
// Create customer route
router.post("/", (0, validateRequest_1.default)(customer_validation_1.customerValidation.createCustomerValidation), customer_controller_1.customerController.createCustomer);
// get all customer route
router.get('/', customer_controller_1.customerController.getAllCustomer);
// get customer ID 
router.get('/:customerId', customer_controller_1.customerController.getByCustomerId);
// Update customer route
router.put('/:customerId', (0, validateRequest_1.default)(customer_validation_1.customerValidation.updateCustomerValidation), customer_controller_1.customerController.updateCustomer);
// Delete Customer route
router.delete('/:customerId', customer_controller_1.customerController.deleteCustomer);
exports.customerRoutes = router;
