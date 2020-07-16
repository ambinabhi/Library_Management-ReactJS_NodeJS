import React, { Component } from "react";
import HomeItem from "./HomeItem";
import {withRouter} from "react-router-dom";
import {Loader, Grid} from 'semantic-ui-react';
import commonService from '../../common-service/commonService';
import AdminHome from './AdminHome';
import showToast from '../../ui-util/showToast';
import ApiClient from '../../API/APIClient';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          allBooksData: [],
          allAvailableBooks: []
        }
      }
    
      style = {
        main:{
            height: "calc(100% - 110px)",
            width: "100vw",
            position: "relative",
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
    
    
      getAllBooks(){
        console.log("home screen called")
        const booksData = ApiClient.getAllBooks()
        booksData.then(booksData => {
          if(booksData.length > 0){
            if(window.localStorage.getItem("isAdmin") === "true") {
              this.setState({allBooksData: booksData});
            }else {
              this.setState({allAvailableBooks: booksData});
            }
          }else{
            showToast("No Books found in library", 'top')
          }
       });
      }
    
    componentDidMount(){
      let headerBarContext = commonService.getHeaderBarContext();
      headerBarContext.setHeaderVisibility(true)
      this.getAllBooks(false);
      commonService.setHomeContext(this);
    }
    
      render() {
        return (
          <div style={this.style.main}>
          <div style ={{zIndex: "10", display: !this.state.isLoading ? "none" : ""}}>
              <Loader/>
          </div>
        
          {(window.localStorage.getItem("isAdmin") === "true") ? 
          <AdminHome allData = {this.state.allBooksData}/>
          : <div style={{height: "90%", overflowY: "scroll", overflowX: "hidden", padding: "20px"}}>
            <Grid columns={4} relaxed>
            {this.state.allAvailableBooks.map((book, i) => (
                 <Grid.Column key= {i}>
                 <HomeItem key= {i} homeBooks = {book}/>
                 </Grid.Column>
             ))}
             </Grid>
             </div>
          }
        </div>
        
        );
      }
}
    
export default withRouter(HomeScreen);
