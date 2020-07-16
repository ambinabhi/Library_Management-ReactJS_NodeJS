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

###Approach
The project contains two tables on the database. One for the user management and another for maintaining books in the library.
The user table has ```isAdmin``` bit in order to classsify the user as admin or user. Based on this flag different home screens are loaded for user types.
Admin page shows a form to add books and a table to view the books. In contrast, the home screen for a user shows the availbale books in the library. 
User has given option to view his borrowed books by navigating to the ```My List``` from the top right dropdown.

Books table has columns such as name of the book, author, publisher and quantity available in the library. This table is updated based on the operations performed by the user such as reducing the quantity of the book. Further, a new table ```borrowedbooks``` table is maintined in order to track the borrowed books. When user borrows a book, the quantity is reduced from the  ```books``` table and is simultaneously inserted into ```borrowedbooks``` table. Similarly when user returns a book, the qunatity is increased in from ```books``` table and removed from ```borrowedbooks``` table. Using the life cycle methods provided ny ReactJS framework the books interface is updated regularly whenever an event occurs. The ```borrowedbooks``` table can further be used to get all the borrowed books by the user by joining it with ```books``` table based on ```user_id```.

Rather than focussing on writing unit test cases, the project provides a comprehensive user interface designed using modular ReactJS components. 
The same use cases can be performed for multiple users also. 

### Screenshots

No books found in the library
![User page](https://user-images.githubusercontent.com/10976047/87732295-df30e200-c7cc-11ea-96fc-5253e3b20c44.png)
![Admin page](https://user-images.githubusercontent.com/10976047/87732297-e0620f00-c7cc-11ea-9d2e-1a457ad0f9bb.png)
![sql_borrowed_empty](https://user-images.githubusercontent.com/10976047/87732716-0fc54b80-c7ce-11ea-8ad0-2b0d39b5c959.PNG)

Admin adding all books
![Admin page](https://user-images.githubusercontent.com/10976047/87731989-0aff9800-c7cc-11ea-9c02-e9994db55bd5.png)

Books table after adding all book, please observe number of book
![sql_books](https://user-images.githubusercontent.com/10976047/87732392-1ef7c980-c7cd-11ea-9d32-22d701e3636b.PNG)

User viewing all books
![user_all_books](https://user-images.githubusercontent.com/10976047/87732446-4b134a80-c7cd-11ea-888d-d8e48aaa81dc.png)

User borrows a book i.e first book, the quantity of the book from library should be reduced
![user_borrow_and_reduce](https://user-images.githubusercontent.com/10976047/87732498-7433db00-c7cd-11ea-94d4-64ee8190cf4d.png)

User tries to borrow the same copy of book
![user_already_borrowed](https://user-images.githubusercontent.com/10976047/87732590-b5c48600-c7cd-11ea-95f6-b74357f7e178.png)

User borrows a second different book
![user_second_book](https://user-images.githubusercontent.com/10976047/87732615-c7a62900-c7cd-11ea-9ad1-d1b436ce5929.png)

User tries to borrow more books after renting 2 books
![user_already_borrowed_2_books](https://user-images.githubusercontent.com/10976047/87732642-dc82bc80-c7cd-11ea-94e8-4e49ff171edf.png)

Books table after a user borrows 2 different books
![sql_borrowed_books](https://user-images.githubusercontent.com/10976047/87732724-1358d280-c7ce-11ea-8f85-714898178b6c.PNG)

After the books are borrowed the back-end application maintains another table to track the borrowed books
![sql_from_borrowed_table](https://user-images.githubusercontent.com/10976047/87732992-b27dca00-c7ce-11ea-96fb-5c1a1264bee9.PNG)

Navigate to user screen to borrow all books from option on the top-right corner
![navigate_to_user](https://user-images.githubusercontent.com/10976047/87732875-59ae3180-c7ce-11ea-8a09-128eb4add9ae.png)

User borrowed books are obtained using joining the ```books``` table with ```borrowedbooksUser``` with JOIN query based on the ```user_id``` returns all books to library using the return button, when all the books are retured, the API return a proper status message.
![return_book_1](https://user-images.githubusercontent.com/10976047/87732920-79455a00-c7ce-11ea-97e4-1efb136e3a4f.png)
![return_book_2](https://user-images.githubusercontent.com/10976047/87732921-79ddf080-c7ce-11ea-9ab1-e03618293022.png)

After all the books are returned the ```books``` table returns back to its initial state and ```borrowedbook``` table is ideally cleared
![sql_after_retun_all](https://user-images.githubusercontent.com/10976047/87733142-2fa93f00-c7cf-11ea-89ec-5d43b0f4e4dd.PNG)


