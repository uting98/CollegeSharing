import React from 'react';
import { Link } from 'react-router-dom';

function Product({ productID, productName, desc, price, amount, imageURL, createdAt, sellerID, category }) {
    console.log("\n Product.js \n");
    let name = productName;
    if(productName.length > 30)
      name = productName.substring(0,30) + '...';

    if(amount<=0){
      return(<div></div>)
    }
 
  return (
    
      <div className="col-5 col-md-4 col-lg-3" style={{minWidth:'150px'}} >
        <div className="card mb-4 shadow">
          <div className="card-body card-text" >
            <img src={imageURL} alt="product" style={{maxWidth:'40%', height: 'auto'}} />
            <br></br>
            <br></br>
            <Link to={"/IndividualProduct/"+productID} style={{color:'#555555'}}>{ name }</Link>
              
            
          </div>
          <div className="card-footer small text-muted text-right cus-footer">
            <p>
              Price: ${price}<br/>
              Remaining: {amount}
            </p>
          </div>
          
          
        </div>
      </div>
      
    
  );
}

export default Product;