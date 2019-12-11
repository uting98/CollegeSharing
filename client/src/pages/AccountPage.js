import React from 'react';
import Loading from '../components/Loading';
import UserInfo from '../components/UserInfo';
import Product from'../components/Product';

import Login from './Form/Login';

import Transaction from'../components/Transaction';
//import { display } from '@material-ui/system';
import cookie from "react-cookies";
class AccountPage extends React.Component {
  state = {
    content:[],
    currentUserName: cookie.load('username'),
    currentUserId: 1,
    loading: true,
    school:'def',
    first:'def',
    last:'def',
  }

  async componentDidMount() {
    console.log("component mount cookie is " + cookie.load('username'));
    
    //fetch user profile
    await fetch("/api/users/school/"+this.state.currentUserName)
      .then(res => res.json())

      .then(user => {
        console.log("state saved");
        this.setState({
          //save necessary info from user profile
          school: user[0].school,
          first: user[0].firstName,
          last: user[0].lastName,
        },
        console.log("content " + this.state.content),
        );

    })

    .catch(err => console.log("API ERROR: " , err));


    //then fetch user
    this.fetchUser();

  }


  fetchUser = ev =>{

    fetch("/api/users/username/"+this.state.currentUserName)
    .then(res => res.json())

    .then(user => {
      console.log("state saved");
      this.setState({
        loading: false,
        //create user info 
        content: user.map((p,ii) => <UserInfo  {...p} school= {this.state.school} first = {this.state.first} last = {this.state.last} key={ii} />),
        currentUserId: user[0].userID,
        title: "Your user info is:",
        
      },
      console.log("content " + this.state.content),
      );

    })

    .catch(err => console.log("API ERROR: " , err));

  }


  fetchCurrentProducts = ev =>{
    //fetch products by userID
    fetch("/api/products/u/"+this.state.currentUserId)
    .then(res => res.json())
    
    .then(prod => {
      console.log("state saved products");
      this.setState({
        loading: false, 
        content: prod.map((p,ii) => <Product {...p} key={ii} />),
        title: "Your products currently on sale:"
      },
      );

    })

    .catch(err => console.log("API ERROR: products " , err));
  }

  fetchSoldProducts = ev => {
    //fetch transactions by the sellerID, here the seller is the current user
    fetch("/api/transactions/seller/"+this.state.currentUserId)
      .then(res => res.json())

      .then(trans => {
        console.log("state saved transaction" + this.state.content[0]);
        this.setState({
          loading: false, 
          content: trans.map((p,ii) => <Transaction {...p} key={ii} />),
          title: "Previous products you have sold:"
        },
        );

      })

      .catch(err => console.log("API ERROR: transaction " , err));

  }

  fetchBoughtProducts = ev =>{
     //fetch transactions by the buyerID, here the buyer is the current user
    fetch("/api/transactions/buyer/"+this.state.currentUserId)
    .then(res => res.json())

    .then(trans => {
      console.log("state saved transaction" + this.state.content);
      this.setState({
        loading: false, 
        content: trans.map((p,ii) => <Transaction {...p} key={ii} />),
        title: "Previous products you have bought:"
      },
      );

    })

    .catch(err => console.log("API ERROR: transaction " , err));
   }

  render() {
      
    const isAuthenticated = cookie.load("token");
  
    if(isAuthenticated) {
      let errorMessage = null;

      if(this.state.loading) {
        return <Loading />;
      }

      else if (this.state.content[0] === undefined) {
        errorMessage = (
          <div className="alert alert-warning">
            "No relavent information to show"
          </div>
        );
      }

      return (
        <div style={{width:'100%'}}>  
               {errorMessage}
          <div className="row" style={{display:'contents', overflow:'hidden'}}>
    
            <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 filter-category justify-content-left shadow' style={{overflow:'hidden', background:'#c0c0c0', height:'fit-content',float:'left',textAlign:'left',
              padding:'0.1em 0.5em 0.1em 0.5em', borderColor:'#FFD700 ',borderWidth:'2px', borderStyle:'solid',marginRight:'2em', marginBottom:'2em'}}>
                <strong>Catrgories:</strong>
                  <br/>
                <input type="radio" name="account"  onClick={this.fetchUser} style={{marginRight: '1em'}} defaultChecked/>
                  User Info
                <br/>
                <input type="radio" name="account" onClick={this.fetchCurrentProducts} style={{marginRight: '1em'}}/>
                  On Sale
                <br/>
                <input type="radio" name="account"  onClick={this.fetchSoldProducts}  style={{marginRight: '1em'}}/>
                  Products Sold
                <br/>
                <input type="radio" name="account"   onClick={this.fetchBoughtProducts}  style={{marginRight: '1em'}}/>
                  Products Bought
                <br/>
            </div>
            
            <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 row justify-content-center" style={{}}>
              <div style={{ backgroundColor:'white', width:'100%' }}>
                  <h2>{this.state.title}</h2>
                  <div className="row justify-content-center" style={{overflow:'hidden'}} >
                    {this.state.content}  
                  </div>          
              </div>
            
            </div>
        </div>

      
      </div>
      );
      }
      else{
        return(
          <Login />
        );
      }
    }
}

export default AccountPage;