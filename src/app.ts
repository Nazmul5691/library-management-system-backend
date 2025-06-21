import express, { Application, Request, Response } from 'express'
import { borrowRoute } from './app/controllers/borrow.controller';
import { booksRoute } from './app/controllers/books.controller';
import { errorHandler } from './app/middlewares/errorHandler';
import { ErrorRequestHandler } from 'express';


const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute)

app.get('/', (req: Request, res: Response) => {
    res.send("welcome to library management system")
})

app.use(errorHandler as unknown as ErrorRequestHandler);

export default app;