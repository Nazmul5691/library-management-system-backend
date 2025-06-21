import mongoose, { Model, Schema, Document } from "mongoose";
import { IBooks } from "../interfaces/books.interface";

export interface IBookDocument extends IBooks, Document { };

export interface IBookModel extends Model<IBookDocument> {
    borrowBook(bookId: string, quantity: number): Promise<IBookDocument>;
}


const booksSchema = new Schema<IBookDocument, IBookModel>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        genre: {
            type: String,
            required: true,
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ""
        },
        copies: {
            type: Number,
            required: true,
            min: [0, 'Copies must be a positive number'],
            // validate: {
            //     validator: Number.isInteger,
            //     message: 'copies must be an integer'
            // }
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

booksSchema.statics.borrowBook = async function (bookId: string, quantity: number): Promise<IBookDocument> {
    const book = await this.findById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!book.available || book.copies < quantity) {
        throw new Error("Not enough copies available");
    }

    book.copies -= quantity;

    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();

    return book;
}


booksSchema.pre("findOneAndDelete", async function(next){
    const bookId = this.getQuery()._id;
    console.log(`Delete the book with id: ${bookId}`);
    next();
})

booksSchema.post("findOneAndDelete", async function(doc, next){
    if(doc){
        console.log(`Deleted book ${doc.title}`);
    }
    next();
})


export const Books = mongoose.model<IBookDocument, IBookModel>("Books", booksSchema)