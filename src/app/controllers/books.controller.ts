import express, { Request, Response } from 'express'
import { Books } from '../models/books.model';

export const booksRoute = express.Router();


// create book
booksRoute.post('/create-book', async (req: Request, res: Response) => {
    const body = req.body;
    const book = await Books.create(body);

    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book
    })
})


// Get all books with support filtering and sorting
booksRoute.get('/', async (req: Request, res: Response) => {
    try {
        const filter = (req.query.filter as string) || undefined;
        const sortBy = (req.query.sortBy as string) || "createdAt";
        const sort = (req.query.sort as string) || "desc";
        const limit = Number(req.query.limit) || 5;


        const genreFilter = filter ? { genre: filter } : {};
        const sorting = { [sortBy]: sort === "desc" ? -1 : 1 } as any;


        const books = await Books.find(genreFilter).sort(sorting).limit(limit);


        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
});


// get a single book
booksRoute.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
})


// update a book
booksRoute.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const book = await Books.findByIdAndUpdate(bookId, updatedBody, { new: true })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
})


// delete a book
booksRoute.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        await Books.findByIdAndDelete(bookId);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error
        });
    }
})
