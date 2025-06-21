"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const books_controller_1 = require("./app/controllers/books.controller");
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", books_controller_1.booksRoute);
app.use("/api/borrow", borrow_controller_1.borrowRoute);
app.get('/', (req, res) => {
    res.send("welcome to library management system");
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
