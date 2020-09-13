import Book from '../models/Book'
import asyncHandler from 'express-async-handler'
import Fuse from 'fuse.js'

// * @route GET /api/books
// @desc    Get All Book
// @access  Public
export const getBooks = asyncHandler(async (req: any, res: any) => {
    const book = await Book.find().lean();
    if (book.length === 0) {
        return res
            .status(404)
            .json({ success: true, message: "Book Data is Empty" });
    }
    res.status(200).json({ success: true, total: book.length, data: book });
});


// * @route POST /api/books
// @desc    Insert New Book
// @access  Public
export const createBook = asyncHandler(async (req: any, res: any) => {
    const { name, genre, publisher, author, year, price } = req.body;

    // * Validation
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: "Name is Required" });
    }

    // * Push data to mongodb
    const book = new Book({
        name,
        genre,
        publisher,
        author,
        year,
        price,
    });
    const result = await book.save();
    res.status(201).json({ success: true, data: result });
});

// * @route GET /api/books/:id
// @desc    Get Book by Id
// @access  Public
export const getBook = asyncHandler(async (req: any, res: any) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
        return res
            .status(404)
            .json({ success: true, message: "No Book With This ID" });
    }
    res.status(200).json({ success: true, data: book });
});

// * @route PUT /api/books/:id
// @desc    Update Book
// @access  Public
export const updateBook = asyncHandler(async (req: any, res: any) => {
    const id = req.params.id
    const book = await Book.findById(id);
    if (!book) {
        return res
            .status(404)
            .json({ success: false, message: "No Book With This ID" });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, data: result });
});

// * @route DELETE /api/books/:id
// @desc    Delete Book by id
// @access  Public
export const deleteBook = asyncHandler(async (req: any, res: any) => {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `No User With ID: ${id}`,
        });
    }
    res.status(200).json({ success: true, message: "Book Succesfull Delete" });
});

// * @route GET /api/search
// @desc    Search Book by Query
// @access  Public
export const searchBooks = asyncHandler(async (req: any, res: any) => {
    const list = await Book.find().lean();
    const query = req.query.q;

    if (!query) {
        return res
            .status(400)
            .json({ success: false, message: "No Query Entered", total: list.length, data: list });
    }

    // * Fuse JS here
    const options = {
        keys: ["name", "genre", "author"],
        includeScore: true,
    };
    const fuse = new Fuse(list, options);
    const result = fuse.search(query);
    if (result.length == 0) {
        return res.status(404).json({ success: false, message: "No Data Matched" });
    }

    res.status(200).json({ success: true, total: result.length, data: result });
});
