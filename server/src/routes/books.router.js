const express = require('express');
const router = express.Router();
const catchErrors = require('express-catch-errors');

const {getAllBooks, addBook, borrowBook, returnBook, getUserBooks} = require('../controller/books.controller');

router
  .route('/addBook')
  .post(catchErrors(addBook));

router
  .route('/getAllBooks')
  .get(catchErrors(getAllBooks))

router
  .route('/borrowBook')
  .post(catchErrors(borrowBook))

router
  .route('/returnBook')
  .post(catchErrors(returnBook))

router
  .route('/getAllUserBooks')
  .get(catchErrors(getUserBooks))


module.exports = router;