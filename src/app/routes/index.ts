
import express from 'express';
import { customerRoutes } from '../modules/Customer/customer.routes';
import { bikeRoutes } from '../modules/Bike/bike.routes';
import { ServiceRoutes } from '../modules/Service/serviceR.routes';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: customerRoutes
    },
    {
        path: '/bikes',
        route: bikeRoutes
    },
    {
        path: '/services',
        route: ServiceRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;