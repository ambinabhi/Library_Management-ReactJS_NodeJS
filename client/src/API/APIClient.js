import axios from "axios";
let _axiosInstance = null;

// Creating standard instance of axios for this API Client
_axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 30000
});

class ApiClient {
  async login(email, password) {
    try {
      const { data } = await _axiosInstance.post("/user/login", {"email": email, "password": password});
      console.log("api login", data);
      return data;
    } catch (err) {
      console.log("error APIClient", err)
      throw err;
    }
  };

  async addBook(name, author, publisher, quantity){
    try{
      const {data} = await _axiosInstance.post("/books/addBook", 
                      {"name": name, "author": author, "publisher": publisher, "quantity": quantity});
      console.log("api add book", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getAllBooks(){
    try{
      const {data} = await _axiosInstance.get("/books/getAllBooks");
      console.log("api all books", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getAllUserBooks(email){
    try{
      const {data} = await _axiosInstance.get("/books/getAllUserBooks", {
        params: {
          email: email
        }
        });
      console.log("api user books", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  
  async borrowBook(email, bookId, quantity){
    try{
      const {data} = await _axiosInstance.post("/books/borrowBook", {"email": email, "bookId": bookId, "quantity":quantity});
      console.log("api borrow book", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async returnBook(email, bookId, quantity){
    try{
      const {data} = await _axiosInstance.post("/books/returnBook", {"email": email, "bookId": bookId, "quantity":quantity});
      console.log("api return book", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  

}

  
 




  

export default new ApiClient();
