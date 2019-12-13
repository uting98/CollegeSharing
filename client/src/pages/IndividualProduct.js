import React from 'react';
import cookie from "react-cookies";
import TextField from "@material-ui/core/TextField";
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
      sellerName: "",

      fetchChatSuccess: "",
      newChat: "",
      chatID: "",
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
    if(event.target.value > this.state.amount){
       this.setState({ 
         ErrorMessage:"Sorry. We do not have that much products you want.",});
    }
    else if(event.target.value < 0){
      this.setState({ErrorMessage:"Opps. You can not buy negative amount of products"});
    }
    else if(event.target.value == 0){
      this.setState({ErrorMessage:"Are you sure that you don't want to buy anything?"});

    }
    else 
    {
      this.setState({
      [event.target.name]: event.target.value,
      ErrorMessage:"",});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const header = cookie.load('token');
    
    const chatData = {
      sellerID: this.state.sellerID
    };

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
        // console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Chat Validation");
      })
      .then(data => {
        console.log(data);
        this.setState({
          fetchChatSuccess: true,
          chatID: data.value.chatID
        });
        // console.log(this.state.chatID);
      })
      .catch(err => {
        this.setState({
          fetchChatSuccess: false
        });
        console.log(err);
      });
  }


  render(){
    return (
      <div className="individualProductFrame" style={{ width: "50%" }}>
        <div className="card mb-4 shadow">
          <div className="card-body card-text ">
            <img
              src={this.state.imageURL}
              style={{ float: "left", width: "55%" }}
            />

            <div style={{ float: "right", width: "43%", textAlign: "left" }}>
              <h6> Product Name: {this.state.productName} </h6>
              <h6> Sold By: {this.state.sellerNamegi} </h6>
              <h6> Category: {this.state.category} </h6>
              <h6>
                {" "}
                Description:
                <p className="card mb-4 shadow">{this.state.description}</p>
              </h6>
              <h6> Quantity: {this.state.amount}</h6>
              <h6> Price: ${this.state.price}</h6>
            </div>
          </div>

          {this.state.fetchChatSuccess && (
            <Redirect to={`/chat/${this.state.chatID}`} />
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="card-footer small text-muted text-right cus-footer">
              <TextField
                style={{ width: "10%" }}
                type="number"
                placeholder="Quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
                inputProps={{ min: "1", max: this.state.amount }}
                required
              />
              <button
                disabled={cookie.load("username") == this.state.sellerName}
                type="submit"
                style={{ borderRadius: "2px" }}
              >
                Buy
              </button>
              <div style={{ color: "red" }}>{this.state.ErrorMessage}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default IndividualProduct;


