import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model';
import { Books } from '../models/books.model';


export const borrowRoute = express.Router()


borrowRoute.post('/borrow-book', async (req: Request, res: Response) => {
    try {
        const {book, quantity, dueDate} = req.body;
        const updateBook = await Books.borrowBook(book, quantity);

        const borrow = await Borrow.create({book, quantity, dueDate})


        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        })

    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
})