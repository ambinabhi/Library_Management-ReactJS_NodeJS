import React, { Component } from "react";
import { Card,Button, Input } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import showToast from '../../ui-util/showToast';
import ApiClient from '../../API/APIClient';
import commonService from "../../common-service/commonService";

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQuantity: 1,
      loading: false
    };
  }

  handleReturnPress() {
    this.setState({ loading: true});
    var email = window.localStorage.getItem("userEmail");
            const returnData = ApiClient.returnBook(email, this.props.userBooks.id, this.state.selectedQuantity)
            returnData.then(returnData => {
              if(returnData.code === 200){
                let homeContext =  commonService.getUserContext();
                homeContext.getAllUserBooks();
              }
              showToast(returnData.status, 'top')
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

            {this.props.userBooks.name}
          </Card.Header>
          
          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Author:{'  '}
              {this.props.userBooks.author}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Publisher:{'  '}
              {this.props.userBooks.publisher}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
            <span style={{ color: "black" }}>
              Available Units:{'  '}
              {this.props.userBooks.quantity}
            </span>
          </Card.Meta>

          <Card.Meta floated="left">
          <Input
                label='Select Quantity'
                min={1}
                max = {this.props.userBooks.quantity}
                onChange={this.handleQuantityChange}
                type='number'
                value={this.state.selectedQuantity}
              />
          </Card.Meta>
        </Card.Content>
        <Card.Content extra style={{ textAlign: "left" }}>
          <Button
              color="red"
              onClick={this.handleReturnPress.bind(this)}>
              Return Now
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(UserItem);
