import React from 'react';


function Transaction({ transactionID, sellerID, buyerID, productID, price, amount, createdAt }) {

    console.log("\n Transaction.js \n");   
  return (
        <div className="col-12" style={{width:'100%', textAlign:"left"}}>
            <div>
                <ul>
                    <li>
                        <h5><strong>Transaction No. is: {transactionID}</strong></h5>
                    </li>
                    <li>
                        The sellerID is: {sellerID} 
                    </li>
                    <li>
                        The buyerID is: {buyerID}
                    </li>
                    <li>
                        The productID is: {productID}
                    </li>
                    <li>
                        The price was: ${price} per item
                    </li>
                    <li>
                        Amount purchased was: {amount}
                    </li>
                    <li>
                        Occured at: {createdAt}
                    </li>
                </ul>
            </div>
            
            <hr style={{backgroundColor:'#ffb79e', height:"2px", width:"100%"}}/>

        </div>
      
    
  );
}

export default Transaction;