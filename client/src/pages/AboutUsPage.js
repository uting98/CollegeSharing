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
            by Miricle Workers
          </h5>
          <br/>
          <h3>About College Sharing</h3>
          <p>
            Every semester college students need to purchase new supplies, leading to potentially expensive bills while they already in huge student debt. Meanwhile, other college students have leftover or unused supplies from previous semesters taking up space and collecting dust. Leading to students holding onto these supplies for a long time waiting to find some use for them.
            <br/> <br/>
            So we are creating Collegesharing as a solution. Collegesharing is an e-commerce site that allows CUNY college students to buy and sell school supplies with other students at your school to resolve these issues. We match you to products sold by other students at your CUNY college so you may find, purchase, and pick up your new supplies quickly on campus.
          </p>
          <br/>
          <h3>Tools used</h3>
          <p>
            We used React JS to build the front end we used tools like bootstrap and material UI to help. On the backend we used node.js and the express.js framework. We used sequeilize as our ORM and postgresql as our database.
          </p>
          
        </div>
        
        <br/>
        
        <div className = "row justify-content-center"  style={{backgroundColor:'white', padding:'1em 0em 1em 0em'}}>
          
        <h3 className = "col-12" >Meet the team!</h3>
          <br/>

            <div className = "col-sm-12 col-md-4 col-lg-4" style={{backgroundColor:'lightgray', borderColor:'#FF00FF ',borderWidth:'2px', borderStyle:'solid'}}>
              <h4>PERSON A</h4>
              <img src={port} alt='person A' style={{maxWidth:'40%', maxHeight:'40%'}}/>
              <p>I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021. Github and Linkedin</p>
             
            </div>
            <div className = "col-sm-12 col-md-4 col-lg-4" style={{backgroundColor:'lightgray', borderColor:'#FF00FF ',borderWidth:'2px', borderStyle:'solid'}}>
            <h4>PERSON B</h4>
            <img src={port} alt='person B' style={{maxWidth:'40%', maxHeight:'40%'}}/>
              <p>I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021.I am juonir at Queens colleg graduating in Spring 2021. Github and Linkedin</p>
            </div>
            <div className = "col-sm-12 col-md-4 col-lg-4" style={{backgroundColor:'lightgray', borderColor:'#FF00FF ',borderWidth:'2px', borderStyle:'solid'}}>
            <h4>Jonathan Cali</h4>
            <img src={port} alt='person C' style={{maxWidth:'40%', maxHeight:'40%'}}/>
              <p>I am junoir at CUNY Queens College graduating in Spring 2021. Over the past semseter I have taking part in CUNY Tech Prep which is where we built College Sharing. I love to make things and see how they run, but I also enjoy taking things apart and seeing what makes the tick. I also a big fan of video games and sports in particular the MLB</p>
              <a href='https://github.com/JC987' rel="noopener noreferrer" target='_blank'>Github</a> <a href='https://www.linkedin.com/in/jonathan-cali/' rel="noopener noreferrer" target='_blank'>Linkedin</a>
            </div>

        </div>
      </div>
   
  );
}

export default AboutUsPage;