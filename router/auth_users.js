const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('./usersdb.js');
const bookReviews = require('./bookReviews.js');

router.post('/login', function (req, res) {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        const token = jwt.sign({ username }, 'your_secret_key');
        req.session.user = user;
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
});


router.post('/register', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});


router.post('/review/:isbn', function (req, res) {
    const { isbn } = req.params;
    const { review } = req.body;
    const username = req.session.user.username; 
    const existingReviewIndex = bookReviews.findIndex(r => r.isbn === isbn && r.username === username);
    if (existingReviewIndex !== -1) {
        bookReviews[existingReviewIndex].review = review;
        res.send('Review updated successfully');
    } else {
        bookReviews.push({ isbn, username, review });
        res.send('Review added successfully');
    }
});

router.delete('/review/:isbn', function (req, res) {
    const { isbn } = req.params;
    const username = req.session.user.username; 
    const indexToDelete = bookReviews.findIndex(r => r.isbn === isbn && r.username === username);
    if (indexToDelete !== -1) {
        bookReviews.splice(indexToDelete, 1);
        res.send('Review deleted successfully');
    } else {
        res.status(404).send('Review not found');
    }
});

module.exports = {
    authenticated: router
};
