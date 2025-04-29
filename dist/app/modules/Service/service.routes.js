"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
// Create bike route
router.post("/", (0, validateRequest_1.default)(service_validation_1.serviceValidation.createServiceValidation), service_controller_1.serviceController.createService);
// get all service route
router.get('/', service_controller_1.serviceController.getAllService);
// service data befor 7 days and filter panding & in_progress route
router.get('/status', service_controller_1.serviceController.getPendingOrOverdueServices);
// get service ID 
router.get('/:serviceId', service_controller_1.serviceController.getByServiceId);
// complet service route
router.put('/:serviceId/complete', service_controller_1.serviceController.completeService);
exports.ServiceRoutes = router;
