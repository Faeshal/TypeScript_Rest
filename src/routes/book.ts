import express from 'express'
const router = express.Router();
import bookController = require("../controller/book");

// * GET All Book 
router.get("/api/books", bookController.getBooks);

// * GET By id
router.get("/api/books/:id", bookController.getBook);

// * POST New Book
router.post("/api/books", bookController.createBook);

// * PUT 
router.put("/api/books/:id", bookController.updateBook);

// * Delete By ID
router.delete("/api/books/:id", bookController.deleteBook);

// * Search
// router.get("/api/books/search", bookController.searchBooks);

export default router
