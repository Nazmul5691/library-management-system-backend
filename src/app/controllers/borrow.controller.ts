import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model';
import { Books } from '../models/books.model';


export const borrowRoute = express.Router()


borrowRoute.post('/borrow-book', async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;
        const updateBook = await Books.borrowBook(book, quantity);

        const borrow = await Borrow.create({ book, quantity, dueDate })


        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
})



borrowRoute.get('/summary', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
})