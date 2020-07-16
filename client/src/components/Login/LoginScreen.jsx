import React, { Component } from "react";
import { Grid, Form, Segment, Button, Icon } from "semantic-ui-react";
import LoginBg from "../../assets/LoginBg.jpg";
import {withRouter} from "react-router-dom";
import showToast from '../../ui-util/showToast';
import ApiClient from '../../API/APIClient';

class LoginScreen extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
      username: "",
      password: "",
      errors: [],
      isAdmin: false
    };
  }


  style = {
    main: {
      height: "100%",
      backgroundImage: `url(${LoginBg})`,
      opacity: "2.5"
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
      const userData = ApiClient.login(this.state.username, this.state.password)
      userData.then(userData => {
        if(userData.length > 0){
          localStorage.setItem("userEmail", this.state.username)
          if(userData[0].isAdmin.data[0] === 1){
            localStorage.setItem("isAdmin", "false");
          }else{
            localStorage.setItem("isAdmin", "true");
          }
          showToast("Welcome" + this.state.username);
          this.setState({loading: false})
          this.props.history.push({
          pathname: '/home'
          })
        }else{
          showToast("Something Went wrong", 'bottom')
        }
     });
  }
   
  render() {

    return (
      <div style={this.style.main}>
        <Grid textAlign="center" verticalAlign="middle" className="signin">
          <Grid.Column style={{ maxWidth: 450 }}>
            
            <Icon name="user circle" size="huge" color="orange" />
            <Form
              style={{ marginTop: "10px" }}
              size="large"
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                  type="text"
                />
                <Form.Input
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                  type="password"/>

               
                <Button
                  className={this.state.loading ? "loading" : ""}
                  color="orange"
                  fluid
                  size="large">
                  Log In
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(LoginScreen);
