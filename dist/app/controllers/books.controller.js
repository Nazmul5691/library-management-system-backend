"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoute = express_1.default.Router();
// create book
exports.booksRoute.post('/create-book', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Books.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get all books with support filtering and sorting
exports.booksRoute.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter || undefined;
        const sortBy = req.query.sortBy || "createdAt";
        const sort = req.query.sort || "desc";
        const limit = Number(req.query.limit) || 5;
        const genreFilter = filter ? { genre: filter } : {};
        const sorting = { [sortBy]: sort === "desc" ? -1 : 1 };
        const books = yield books_model_1.Books.find(genreFilter).sort(sorting).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        next(error);
    }
}));
// get a single book
exports.booksRoute.get('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
// update a book
exports.booksRoute.put('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const book = yield books_model_1.Books.findByIdAndUpdate(bookId, updatedBody, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
// delete a book
exports.booksRoute.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        // await Books.findByIdAndDelete(bookId);
        yield books_model_1.Books.findOneAndDelete({ _id: bookId });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        next();
    }
}));
