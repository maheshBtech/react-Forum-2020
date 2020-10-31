import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Dashbord from "../pages/Dashbord";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/");
  const logout = () => {
    setUserData({ 
      token: undefined,
      user: undefined,
    },history.push('/'));
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav >
      {userData.user ? (

       <div>
           <div className = "logout">
            <button onClick={logout}>Log out</button>
         </div>
         <Dashbord/>
       </div>

      ) : (
        <div className="nav">
          <button onClick={register}>Join now</button>
          <button onClick={login}>Sign in</button>
        </div>
      )}
    </nav>
  );
}
