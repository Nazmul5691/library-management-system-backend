import express, { Application, Request, Response } from 'express'
import { booksRoute } from './app/controllers/books.controller';
const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("welcome to library management system")
})

export default app;