import express, { Application, Request, Response } from 'express'
import { createBorrow, getBorrow } from './app/controllers/borrow.controller';
import { createBook, deleteSingleBook, getBooks, getSingleBook, updateSingleBook } from './app/controllers/books.controller';
import { errorHandler } from './app/middlewares/errorHandler';
import { ErrorRequestHandler } from 'express';


const app: Application = express();
const router = express.Router();

app.use(express.json());
app.use(router);

// app.use("/api/books", booksRoute);
// app.use("/api/borrow", borrowRoute)

router.post("/api/books", createBook)
router.get("/api/books", getBooks)
router.get("/api/books/:bookId", getSingleBook)
router.put("/api/books/:bookId", updateSingleBook)
router.delete("/api/books/:bookId", deleteSingleBook)


router.post("/api/borrow", createBorrow)
router.get("/api/borrow", getBorrow)



app.get('/', (req: Request, res: Response) => {
    res.send("welcome to library management system")
})

app.use(errorHandler as unknown as ErrorRequestHandler);

export default app;