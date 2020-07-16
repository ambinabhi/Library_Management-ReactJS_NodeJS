import React, { Component } from "react";
import UserItem from "./UserItem";
import {withRouter} from "react-router-dom";
import {Loader, Grid} from 'semantic-ui-react';
import commonService from '../../common-service/commonService';
import showToast from '../../ui-util/showToast';
import ApiClient from '../../API/APIClient';

class UserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          userBooksData: []
        }
      }
    
      style = {
        main:{
            height: "calc(100% - 110px)",
            width: "100vw",
            position: "raltive",
            background: "#37475A",
            display: "flex",
            alignItems: "stretch",
            flexDirection: "column",
            justifyContent: "flex-start",
            flex: "1",
            padding: "20px"
        },
        dropdownCustom: {
            width: "25%"
        }
      };
    
    
      getAllUserBooks(){
        var email = window.localStorage.getItem("userEmail");
        const booksData = ApiClient.getAllUserBooks(email)
        booksData.then(booksData => {
          if(booksData.length > 0){
              this.setState({userBooksData: booksData});
          }else{
            showToast("No Books borrowed", 'top')
          }
       });
      }
    
    componentDidMount(){
      let headerBarContext = commonService.getHeaderBarContext();
      headerBarContext.setHeaderVisibility(true)
      this.getAllUserBooks();
      commonService.setUserContext(this);
    }
    
      render() {
        return (
          <div style={this.style.main}>
          <div style ={{zIndex: "10", display: !this.state.isLoading ? "none" : ""}}>
              <Loader/>
          </div>
        
         <div style={{height: "90%", overflowY: "scroll", overflowX: "hidden", padding: "20px"}}>
            <Grid columns={4} relaxed>
            {this.state.userBooksData.map((book, i) => (
                 <Grid.Column key= {i}>
                 <UserItem key= {i} userBooks = {book}/>
                 </Grid.Column>
             ))}
             </Grid>
             </div>
        </div>
        );
      }
}
    
export default withRouter(UserScreen);
