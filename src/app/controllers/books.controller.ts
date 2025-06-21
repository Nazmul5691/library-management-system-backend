import express, { NextFunction, Request, Response } from 'express'
import { Books } from '../models/books.model';

export const booksRoute = express.Router();


// create book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const body = req.body;
        const book = await Books.create(body);

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error) {
        next(error)
    }
};



// Get all books with support filtering and sorting
export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error)
    }
};


// get a single book
export const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error) {
        next(error)
    }
};


// update a book
export const updateSingleBook = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error)
    }
};


// delete a book
export const deleteSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;

        // await Books.findByIdAndDelete(bookId);
        await Books.findOneAndDelete({ _id: bookId })

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })

    } catch (error) {
        next()
    }
};
