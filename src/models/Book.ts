import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    genre: String,
    publisher: String,
    author: String,
    year: Number,
    price: Number,
});

const Book = mongoose.model("Book", BookSchema);
export default Book
