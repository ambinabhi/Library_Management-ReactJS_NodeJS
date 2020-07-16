# Library_Management-ReactJS_NodeJS
A simple library management module developed with ExpressJS and MySQL with ReactJS as front-end

## Techonologies used in this application

### Front-end

1. ReactJS
2. Semantics UI
3. React-Bootstrap

### Back-end

1. MySQL
2. Express.js
3. Node.js

## Install dependencies
Open a git bash of command line into each client/server folder. Run ```npm install``` command to install all require nodu modules and other UI dependencies.

### Install MySQL
Install MySQL [from here]( https://dev.mysql.com/downloads/mysql/). Create database with name of your choice. Change the database configurations [here](/server/src/db/index.js)

##Run Application
Once all the dependencies are install navigate inside client/server folders. Application will run on those ports.

## Functionalitites
The whole project has been divided into 2 modules

* Admin
* User

### Admin module functionalities
* Login (For the purpose of this assignment login for user/admin is hardcoded. Few of the users are create on database console directly.)
* Add books 

### User module functionalities
* Login
* View books
* Borrow Books (Based on the use cases in the assignment)
* Return Book 

## API Routes
> POST : ```/api/login```
API routes for users and admin to login to the application

> POST : ```/api/books/addBook (name, author, publisher, quantity)```
An API route that allow admins to add new book:

> GET : ```/api/books/getAllBooks```
An API route that allow users and admins to get all books in the library

> POST : ```/api/books/borrowBook (email, book_id, quantity)```
An API route that allow users to borrow a book in the library

> GET : ```/api/books/getAllUserBooks?email=email_id```
An API route that allow users to get all the books that the user has borrowed but has not returned

> POST : ```/api/books/returnBook (email, book_id, quantity)```
An API route that allow user to return a book

### Screenshots

No books found in the library
![User page](https://user-images.githubusercontent.com/10976047/87732295-df30e200-c7cc-11ea-96fc-5253e3b20c44.png)
![Admin page](https://user-images.githubusercontent.com/10976047/87732297-e0620f00-c7cc-11ea-9d2e-1a457ad0f9bb.png)

Admin adding all books
![Admin page](https://user-images.githubusercontent.com/10976047/87731989-0aff9800-c7cc-11ea-9c02-e9994db55bd5.png)
