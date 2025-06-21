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
const router = express_1.default.Router();
app.use(express_1.default.json());
app.use(router);
router.post("/api/books", books_controller_1.createBook);
router.get("/api/books", books_controller_1.getBooks);
router.get("/api/books/:bookId", books_controller_1.getSingleBook);
router.put("/api/books/:bookId", books_controller_1.updateSingleBook);
router.delete("/api/books/:bookId", books_controller_1.deleteSingleBook);
router.post("/api/borrow", borrow_controller_1.createBorrow);
router.get("/api/borrow", borrow_controller_1.getBorrow);
app.get('/', (req, res) => {
    res.send("welcome to library management system");
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
