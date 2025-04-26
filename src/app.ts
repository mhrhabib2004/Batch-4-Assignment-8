

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './middlewares/globalErrorHandler';




const app: Application = express();
// app.use(cors());
app.use(cors({ origin: "https://bike-service-prisma-server.vercel.app" }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Bike service prisma backend server is runing..."
    })
});

app.use('/api', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app;