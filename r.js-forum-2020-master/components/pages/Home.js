import React, { useContext } from "react";

import UserContext from '../../context/userContext';

import HomePage from "./HomePage";

export default function Home() {
  const { userData } = useContext(UserContext);
  
 
  return (
    <div className="page">
        

      {  userData.user ? (
        // <h1>Welcome {userData.user.username} </h1>
        <div>
          <HomePage  />
          </div>
         ) :
         (
        <div className = "heading2">
          <h1>your are loged out</h1>
        </div>
         )

      }
      
    </div>
  );
}
