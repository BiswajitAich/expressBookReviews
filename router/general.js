const express = require('express');
const axios = require('axios');
const router = express.Router();
const books = require('./booksdb.js');
const bookReviews = require('./bookReviews.js');

// '''without using Promise callbacks or async-await with Axios.'''
router.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 2));
});

// '''using Promise callbacks or async-await with Axios.'''
router.get('/books', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000');
        const books = response.data;
        res.send(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
});



// '''without using Promise callbacks or async-await with Axios.'''
router.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// '''using Promise callbacks or async-await with Axios.'''
router.get('/isbn/:isbn', async function (req, res) {
    const { isbn } = req.params;
    try {
        const response = await axios.get(`http://localhost:5000/`);
        const bookData = response.data;
        const book = bookData.find(book => book.isbn === isbn);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).send('Error fetching book details');
    }
});



// '''without using Promise callbacks or async-await with Axios.'''
router.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = books.filter(book => book.author === author);
    if (booksByAuthor.length > 0) {
        res.send(booksByAuthor);
    } else {
        res.status(404).send('Books by author not found');
    }
});

// '''using Promise callbacks or async-await with Axios.'''
router.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`http://localhost:5000/`);
        const books = response.data;
        const booksByAuthor = books.filter(book => book.author === author);
        if (booksByAuthor.length > 0) {
            res.send(booksByAuthor);
        } else {
            res.status(404).send('Books by author not found');
        }
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).send('Error fetching books by author');
    }
});



// '''without using Promise callbacks or async-await with Axios.'''
router.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = books.filter(book => book.title === title);
    if (booksByTitle.length > 0) {
        res.send(booksByTitle);
    } else {
        res.status(404).send('Books by title not found');
    }
});

// '''using Promise callbacks or async-await with Axios.'''
router.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:5000/`);
        const booksData = response.data;
        const booksByTitle = booksData.filter(book => book.title === title);
        if (booksByTitle.length > 0) {
            res.send(booksByTitle);
        } else {
            res.status(404).send('Books by title not found');
        }
    } catch (error) {
        console.error('Error fetching books by author:', error);
        res.status(500).send('Error fetching books by author');
    }
});




router.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const reviewsForBook = bookReviews.filter(review => review.isbn === isbn);
    if (reviewsForBook.length > 0) {
        res.send(reviewsForBook);
    } else {
        res.status(404).send('Reviews for book not found');
    }
});

module.exports = {
    general: router
};
