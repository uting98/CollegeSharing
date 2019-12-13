import React from 'react';

import TextField from "@material-ui/core/TextField";


function UserInfo({ userID, username, email, password, school, first, last }) {
    console.log("\n UserInfo.js \n");
  return (
  <div className="col-12" style={{width:'100%', textAlign:"left"}}>
              <ul>
                <li>
                  Name is:<strong> {first} {last} </strong>
                </li>
                <li>
                  User ID is:<strong> {userID} </strong>
                </li>
                <li>
                  Username is:<strong> {username} </strong>
                </li>
                <li>
                  Email is: <strong>{email}</strong>
                </li>
                <li>
                  School is:<strong> {school}</strong>
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

                      
              <hr style={{backgroundColor:'#ffb79e', height:"2px", width:"100%"}}/>
    
        </div>
      
    
  );
}

export default UserInfo;