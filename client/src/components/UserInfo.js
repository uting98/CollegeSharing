import React from 'react';

import TextField from "@material-ui/core/TextField";


function UserInfo({ userID, username, email, password, school, first, last }) {
    console.log("\n UserInfo.js \n");
  return (
        <div className="col-12" style = {{overflow:'hidden',textAlign:"left", backgroundClip:'white', paddingLeft:'2em', fontSize:'16px'}}>
              <ul>
                <li>
                  <p>Name is:<strong> {first} {last} </strong></p>
                </li>
                <li>
                  <p>User ID is:<strong> {userID} </strong></p>
                </li>
                <li>
                  <p>Username is:<strong> {username} </strong></p>
                </li>
                <li>
                  <p>Email is: <strong>{email}</strong></p>
                </li>
                <li>
                  <p>School is:<strong> {school}</strong></p>
                </li>
                          
                <li>
                  <TextField
                  id="text-field-with-svg-password"
                  label="Password"
                  type="password"
                  value = {password}
                  className="md-cell md-cell--bottom"/>
                </li>
              </ul>
            
          <hr color="#c7c34c" size="2" width="100%"></hr>
        </div>
      
    
  );
}

export default UserInfo;