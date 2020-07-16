const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const userRouter = require('./routes/user.router');
const booksRouter = require('./routes/books.router');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}))
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/books', booksRouter)

app.listen(8080, function(){
    console.log("Server is up");
})