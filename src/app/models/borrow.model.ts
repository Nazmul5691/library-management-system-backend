import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Books",
            required: [true, "Book ID is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [1, "Quantity must be at least 1"],
            validate:{
                validator: Number.isInteger,
                message: "Quantity must be an integer"
            }
        },
        dueDate: {
           type: Date,
           required: [true, "due date is required"]
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)


export const Borrow = model<IBorrow>('Borrow', borrowSchema)