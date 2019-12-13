import React from 'react';
import cookie from "react-cookies";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

class IndividualProduct extends React.Component {
   constructor(props) {
    super(props);
    const urls = window.location.href;
    const pID = urls.slice(urls.lastIndexOf('/') + 1, urls.length);
    this.state = {
      productID: pID,
      productName: "",
      description: "",
      price: "",
      amount: "",
      sellerID: "",
      category: "",
      image: null,
      imageURL: "",
      ErrorMessage:"",
      remaining:"",
      sellerName: "",

      success: "",
      newChat: "",
      chatId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

componentDidMount() {
    const { pID } = this.props.match.params;
     fetch("/api/products/"+ this.state.productID )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
              this.setState({
                productName: result.productName,
                description: result.description,
                price: result.price,
                amount: result.amount,
                sellerID: result.sellerID,
                category: result.category,
                imageURL: result.imageURL,
                sellerName: result.sellerName,
          });
          //console.log(filteredDate.productID); 
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            error
          });
        }
      )

  }

  handleChange = (event) => {
    console.log("event is "+ event.target.value);
    if(event.target.value > this.state.amount){
       this.setState({ quantity:"",
         ErrorMessage:"Sorry. We do not have that much products you want.",});
    }
    else if(event.target.value < 0){
      this.setState({ErrorMessage:"Opps. You can not buy negative amount of products"});
    }
    else if(event.target.value == 0){
      this.setState({quantity:"", ErrorMessage:"Are you sure that you don't want to buy anything?"});

    }
    else 
    {
      this.setState({
      remaining: this.state.amount - event.target.value,
      quantity: event.target.value,
      ErrorMessage:"",});
    }
  }
  
  createTransaction = (event)=> {
    const header = cookie.load('token');
    const transactionData = {
      sellerID: this.state.sellerID,
      productID: this.state.productID,
      buyerID: 4,
      price: this.state.price,
      amount: this.state.quantity
    }


    fetch("/api/transactions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${header}`
      },
      body: JSON.stringify(transactionData)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Transaction Validation");
      })
      .then(product => {
        this.setState({
          success: true
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  }

  updateProduct = (event) =>{

    fetch("/api/products/amount/"+this.state.productID+"/"+ this.state.remaining, {
      method: 'PUT',
      credentials: "include",

    }).then((response) => {
      response.json().then((response) => {
        console.log("response is " + response);
      })
    }).catch(err => {
      console.error("button error " + err)
    })
  
    this.setState({
      amount: this.state.remaining
    });

  }

  handleSubmit = (event) => {
    event.preventDefault(); 
    
    const chatData = {
      sellerID: this.state.sellerID
    };

    const header = cookie.load('token');
  

    this.createTransaction();
    console.log("Button pressed");
    this.updateProduct();

    // console.log(productData)

    fetch("/api/chat", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${header}`
      },
      body: JSON.stringify(chatData)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Chat Validation");
      })
      .then(data => {
        console.log(data);
        this.setState({
          success: true,
          // chatId: data.
          // newChat: data[1]
        });
        // <Redirect to={`/viewpost/${mainPost.postID}`} />
        // console.log(this.state.newChat)
      })
      .catch(err => {
        this.setState({
          //success: false
        });
        console.log(err);
      });
  }


  render(){
    let errorMessage;
    if (this.state.success) {
      errorMessage = (
        <div className="alert alert-success">
          "Purchase recorded"
        </div>
      );
    }

    return(
      <div className = "individualProductFrame" style={{width:'50%'}} >
        {errorMessage}
        <div className="card mb-4 shadow">
          <div className="row card-body card-text ">
            <div className='col-xs-12 col-sm-5'>
              
            <img src={this.state.imageURL} style={{float:'left', width:'100%'}}/>
            
            </div>
            <div className = "col-xs-12 col-sm-7" style={{float:'right', width:'100%', textAlign:'left'}}>
              <h6> Product Name: {this.state.productName}</h6>
              <h6> Sold By: {this.state.sellerName} (id: {this.state.sellerID})</h6>
              <h6> Category: {this.state.category} </h6>
              <h6 > Description: 
                <p className="card mb-4 shadow"> 
                  {this.state.description}
                </p>
              </h6>
              <h6> Quantity: {this.state.amount}</h6>
              <h6> Price: ${this.state.price}</h6>             
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="card-footer small text-muted text-right cus-footer">
              <TextField style={{minWidth:'10%', width:'100px', marginBottom:'1em'}}
                type="number" 
                placeholder="Quantity" 
                value = {this.state.quantity}
                onChange = {this.handleChange}
                inputProps={{ min: "1", max: this.state.amount }}
                required
              />

              <Button disabled={cookie.load("username") == this.state.sellerName} type="submit" style={{backgroundColor:'#ff7e52', marginLeft:'1em', borderRadius: '2px'}}> Buy </Button>
              <div style = {{color:'red'}}>{this.state.ErrorMessage}</div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default IndividualProduct;


