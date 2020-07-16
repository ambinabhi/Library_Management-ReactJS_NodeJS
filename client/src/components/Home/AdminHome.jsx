import React, { Component } from "react";
import { Table, Button, Form, Input } from "semantic-ui-react";
import showToast from "../../ui-util/showToast";
import ApiClient from "../../API/APIClient";
import commonService from "../../common-service/commonService";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooksData: [],
      name: "",
      author: "",
      publisher: "",
      quantity: 1,
      loading: false
    };
  }

  style = {
    container: {
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
    },

    box: {
      overflow: "scroll",
    },

    boxForm: {
      background: "cadetblue",
      border: "groove",
      padding: "10px",
    },
  };

  componentDidMount() {
   // this.getAllData();
  }

  handleChange = (event) => {
    
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    this.setState({ loading: true});
    const bookData = ApiClient.addBook(
      this.state.name,
      this.state.author,
      this.state.publisher,
      this.state.quantity
    );
    
    bookData.then((bookData) => {
      console.log(bookData);
      this.setState({ loading: false});
      if(bookData.code === 200){
        let homeContext = commonService.getHomeContext();
        homeContext.getAllBooks();
      } 
      showToast(bookData.status, "top");
    });
  };

  render() {
    return (
      <div style={this.style.container}>
        <div style={this.style.box}>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sl No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
                <Table.HeaderCell>Publisher</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.allData.map((book, i) => (
                <Table.Row  key= {i}>
                  <Table.Cell>{i +1}</Table.Cell>
                  <Table.Cell>{book.name}</Table.Cell>
                  <Table.Cell>{book.author}</Table.Cell>
                  <Table.Cell>{book.publisher}</Table.Cell>
                  <Table.Cell>{book.quantity}</Table.Cell>
           
  
    
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div style={this.style.boxForm}>
          <Form onSubmit={this.handleSubmit}>
            <h1>Add Book Here</h1>
            <Form.Field>
              <label>Name</label>
              <input onChange={this.handleChange} name="name" placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input onChange={this.handleChange} name="author" placeholder="Author" />
            </Form.Field>
            <Form.Field>
              <label>Publisher</label>
              <input onChange={this.handleChange} name="publisher" placeholder="Author" />
            </Form.Field>
            <Form.Field>
              <label>Quantity</label>
              <Input
                name="quantity"
                label="Select Quantity"
                min={1}
                onChange={this.handleChange}
                type="number"
                value={this.state.quantity}
              />
            </Form.Field>
            <Button 
            className={this.state.loading ? "loading" : ""}
            style={{ width: "100%" }} type="submit">
              Add Book
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default AdminHome;
