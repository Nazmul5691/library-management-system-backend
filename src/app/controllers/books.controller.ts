import express, { Request, Response } from 'express'
import { Books } from '../models/books.model';

export const booksRoute = express.Router();

booksRoute.post('/create-book', async (req: Request, res: Response) =>{
    const body = req.body;
    const book = await Books.create(body);

    res.status(201).json({
        success: true,
        message: 'book created successfully',
        data: book
    })
})