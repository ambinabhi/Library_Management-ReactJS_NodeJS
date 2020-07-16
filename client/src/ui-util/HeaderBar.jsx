import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {Navbar} from "react-bootstrap"
import { Icon, Header,Dropdown} from "semantic-ui-react";
import commonService from '../common-service/commonService';
import showToast from './showToast';

class HeaderBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isUserLoaded: false
    }
  }
  
  style = {
    navStyle:{
        width: "100%",
        
    },
  };

  componentDidMount = () =>{
    //console.log("DEBUG" + JSON.stringify(this));
    commonService.setHeaderBarContext(this);
  }

  setHeaderVisibility(bool){
    this.setState({isVisible: bool});
  }

  

  logoutUser = () => {
    this.setState({isVisible: false});
    this.props.history.push({
      pathname: '/login'
      })
      showToast("Logged Out Successfully");
  }

  handleHomeClick = () => {
    this.setState({isUserLoaded: !this.state.isUserLoaded});
    if(!this.state.isUserLoaded){
      this.props.history.push({
        pathname: '/user'
        })
    }else {
      this.props.history.push({
        pathname: '/home'
        })
    }
  }


  render() {
    return (
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand style = {this.style.navStyle}>
      <div style={{alignSelf: "center"}}>
        <Header color="orange" as="h1">
        <Icon name="book" size="large" color="olive" />
          Library Management
        </Header>
        </div>
        {this.state.isVisible ? 
        <div style = {{float: "right"}}>
        <span>
        Welcome {' '}
          <Dropdown text={window.localStorage.getItem("userEmail")}>
          <Dropdown.Menu>
          {(window.localStorage.getItem("isAdmin") === "true") ? null :
            <Dropdown.Item icon='list alternate' 
                            text= {this.state.isUserLoaded ? "Home": 'My List'} 
                            onClick = {this.handleHomeClick} />
          }
            <Dropdown.Item onClick={this.logoutUser} 
                            icon='log out' text='Logout' />
          </Dropdown.Menu>
        </Dropdown>
        </span>
        </div> :
        null
      }
      
      </Navbar.Brand>
    </Navbar>
    );
  }
}

export default withRouter(HeaderBar);
