import React, { Component } from "react";
import { Card,Button, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import showToast from '../../ui-util/showToast';
import ApiClient from '../../API/APIClient';
import commonService from "../../common-service/commonService";

class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuantity: 1,
      loading: false
    };
  }

  handleBorrowPress() {
    var email = window.localStorage.getItem("userEmail");
            const borrowData = ApiClient.borrowBook(email, this.props.homeBooks.id, this.state.selectedQuantity)
            borrowData.then(borrowData => {
              this.setState({ loading: true});
              if(borrowData.code === 200){
                let homeContext =  commonService.getHomeContext();
                homeContext.getAllBooks();
              }
              showToast(borrowData.status, 'top')
            });
  }

  selectedQuantity = (e, { name, value }) => this.setState({ selectedQuantity: value })
  
  componentDidMount() {
      
  }

  render() {
    return (
      <Card
        style={{ cursor: "pointer", height: "fit-content", width: "270px" }}
      >
        <img
          style={{ height: "170px" }}
          alt="img not available"
          src='https://toppng.com/uploads/preview/book-icon-new-1-book-icon-11563017422zn4zpaoci5.png'
        />
        <Card.Content>
          <Card.Header style={{ textAlign: "left" }}>

            {this.props.homeBooks.name}
          </Card.Header>
          
          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Author:{'  '}
              {this.props.homeBooks.author}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Publisher:{'  '}
              {this.props.homeBooks.publisher}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Available Units:{'  '}
              {this.props.homeBooks.quantity}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
          <Input
                label='Select Quantity'
                min={1}
                max = {this.props.homeBooks.quantity}
                onChange={this.handleQuantityChange}
                type='number'
                value={this.state.selectedQuantity}
              />
          </Card.Meta>
        </Card.Content>
        <Card.Content extra style={{ textAlign: "left" }}>
          <Button
              disabled = {(this.props.homeBooks.quantity === 0)}
              color="green"
              onClick={this.handleBorrowPress.bind(this)}>
              Borrow Now
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(HomeItem);
