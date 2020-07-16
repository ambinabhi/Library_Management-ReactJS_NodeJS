const express = require('express');
const connection = require('../db');

module.exports.addBook = async(req, res) => {
    console.log("quantity", req.body);
    var name = req.body.name;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var quantity = req.body.quantity;

    var addQuery = "INSERT INTO books (name, author, publisher, quantity) VALUES ('" + name + "','" + author + "','" + publisher + "','" + quantity +"')";

    connection.query(addQuery, [name, author, publisher, quantity], function(err, result) {
        if (err){
          res.send({
            code: 404,
            status: 'Error adding book'
          });
        } else{
          res.send({
            code: 200,
            status: 'Book added successfully'
          });
        }
    })
}

module.exports.getAllBooks = async (req, res) => {

  var booksQuery = 'SELECT * FROM books';

  connection.query(booksQuery, function(err, result) {
    console.log('result--', result);
    if (err) {
      res.send({
        code: 404,
        status: 'Error getting books'
      });
    } else {
        res.json(result);
    }
  });
};

module.exports.borrowBook = async(req, res) => {
    console.log(req.body);
    var bookId = req.body.bookId;
    var userId = req.body.email;
    var quantity = req.body.quantity;
    var borrowed_id = userId + "_" + bookId;

    if(quantity > 1){
      res.send({
        code: 406,
        status: 'Can borrow only one book'
      });
    }else {
 //Check if user has borrowed this book and quantity of books
 var getBorrowQuantityQuery = 'SELECT * from borrowedbooks WHERE user_id=? ';
 connection.query(getBorrowQuantityQuery, [userId], function(err, result) {
   console.log("Count", result.length);
   if (err) {
     res.send({
       code: 404,
       status: 'Error getting user quantity'
     });
   } else if(result.length === 1 && result[0].book_id === bookId){
      
         res.send({
           code: 409,
           status: 'User already borrowed this books'
         });
       
   }else if(result.length === 2) {
       res.send({
         code: 417,
         status: 'User already borrowed 2 books'
       });
   }else {
       //Update books table - reducing quantity of book
       var updateBooksQuery = 'UPDATE books SET quantity = quantity-? WHERE id = ?';
       connection.query(updateBooksQuery, [quantity, bookId], function(err, result) {
         if (err) {
           res.send({
             code: 404,
             status: 'Error updating book Quantity'
           });
         }else {
          //Insert borrowed book
           var insertBorrowQuery = "INSERT INTO borrowedbooks (borrowed_id, book_id, user_id) VALUES ('" + borrowed_id + "','" + bookId + "','" + userId +"')";
           connection.query(insertBorrowQuery, function(error, results){
             console.log(error)
             if(error){
               res.send({
                 code: 404,
                 status: 'Error updating borrowed books'
               });
             }else {
                res.send({
                     code: 200,
                     status: 'Book borrowed successfully'
                 });
             }
           });   
         }
       });
    //}
   }
 });  
    }
  }

module.exports.returnBook = async(req, res) => { 
  var bookId = req.body.bookId;
  var userId = req.body.email;
  var quantity = req.body.quantity;
  var borrowed_id = userId + "_" + bookId;
  console.log("quantity returnBook", quantity);
   //Update books table - increase quantity of book
   var updateBooksQuery = 'UPDATE books SET quantity = quantity+? WHERE id = ?';
   connection.query(updateBooksQuery, [quantity, bookId], function(err, result) {
     if (err) {
       res.send({
         code: 404,
         status: 'Error updating book quantity'
       });
      }else {
    //Update borrowed books - remove from borrowed books
    var updateBorrowedBooksQuery = 'DELETE FROM borrowedbooks WHERE borrowed_id = ?';

    connection.query(updateBorrowedBooksQuery, [borrowed_id], function(err, result) {
      if (err) {
        res.send({
          code: 404,
          status: 'Error updating borrowed books'
        });
       }else {
        res.send({
          code: 200,
          status: 'Return successful'
        });
       }
      });
    }
   });
}

module.exports.getUserBooks = async(req, res) => { 
  let email = req.query.email;
  console.log("email", email);
  var userBooksQuery = 'SELECT * FROM books WHERE id IN (SELECT book_id FROM borrowedbooks WHERE user_id = ?)';

  connection.query(userBooksQuery, [email], function(err, result) {
    console.log('result--', result);
    if (err) {
      res.send({
        code: 404,
        status: 'Error getting user books'
      });
    } else {
        res.json(result);
    }
  });
  
}




