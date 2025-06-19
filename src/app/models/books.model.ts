import mongoose, { Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";


const booksSchema = new Schema<IBooks>(
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


export const Books = mongoose.model<IBooks>("Books", booksSchema)