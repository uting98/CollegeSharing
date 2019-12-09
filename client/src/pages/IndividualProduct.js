import React from 'react';

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
    };
    this.handleChange = this.handleChange.bind(this);
    
}

componentDidMount() {
    const { pID } = this.props.match.params;
     fetch("/api/products/" )
      .then(res => res.json())
      .then(
        (result) => {
          const filteredDate = result.filter((val) => {
            //console.log(val.productID +"vs"+ this.state.productID);
            if(val.productID == this.state.productID) {
              this.setState({
                productName: val.productName,
                description: val.description,
                price: val.price,
                amount: val.amount,
                sellerID: val.sellerID,
                category: val.category,
                imageURL: val.imageURL,
              });
              return val;
            }
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
  render(){
    return(
      <div className = "individualProductFrame" style={{width:'50%'}} >
        <div className="card mb-4 shadow">
          <div className="card-body card-text ">
            <img src={this.state.imageURL} style={{float:'left', width:'55%'}}/>

            <div style={{float:'right', width:'43%', textAlign:'left'}}>
              <h6> Product Name: {this.state.productName} </h6>
              <h6> Sold By: {this.state.sellerID} </h6>
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

          <div className="card-footer small text-muted text-right cus-footer">
            <input style={{width:'10%'}}
              type="number" 
              placeholder="Quantity" 
              value = {this.state.quantity}
              onChange = {this.handleChange}
            />

             <button style={{borderRadius: '2px'}}> Buy </button>
             <div style = {{color:'red'}}>{this.state.ErrorMessage}</div>


          </div>
        </div>
      </div>

    );
  }
}

export default IndividualProduct;


