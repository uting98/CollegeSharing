import React from 'react';
import port from './jonathan-pic.jpg';

function AboutUsPage(props) {
  return (
    <div style={{width:'75%'}}>
        <div style={{backgroundColor:'white',padding:'1em 1em 1em 1em', textAlign:'center'}}>
          <h1>
            College Sharing
          </h1>
          <h5>
           <em>by Miricle Workers</em>
          </h5>
          <br/>
          <h3>About College Sharing</h3>
          <br/>
          <h5><strong>The Problems</strong></h5>
          <p>
            Every semester college students need to purchase new supplies, leading to potentially expensive bills while they already in huge student debt. Meanwhile, other college students have leftover or unused supplies from previous semesters taking up space and collecting dust. Leading to students holding onto these supplies for a long time waiting to find some use for them.
            <br/> <br/>

            <br/>
          <h5><strong>The Solution</strong></h5>
            So we are creating College Sharing as a solution. College Sharing is an e-commerce site that allows CUNY college students to buy and sell school supplies with other students at your school to resolve these issues. We match you to products sold by other students at your CUNY college so you may find, purchase, and pick up your new supplies quickly on campus.
          </p>
          <br/>
          <h3>Tools used</h3>
          <p>
            We used React JS to build the front end and we utilized bootstrap and material UI to help make our site responsive and improve the overall appearnace. On the backend we used node.js and the express.js framework to create a webserver, and used firebase to store pictures and work on a chat feature. We used sequeilize as our ORM and postgresql as our database.
          </p>
          <br/>
          <h3>The team</h3>
          <p>
            College Sharing was made by Yu Ting Yang, Minlu Jiang, Jonahan Cali
          </p>
        </div>
        
        <br/>
        
      </div>
   
  );
}

export default AboutUsPage;