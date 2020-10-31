import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Link} from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });   
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      
      <h1 className = "heading">
         Welcome to your <br/> learning community
      </h1>

    <div id = "error">
    {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    </div>
      <form className = "login" onSubmit={submit}>
        
        <input
          id="login-email"
          placeholder = "Enter email_id"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        /><br/>

        
        <input
          id="login-password"
          type="password"
          placeholder = "Enter password"
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type = "submit">Sign in</button>
        <h4>Don't have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/register">Click here</Link></h4>

        
      </form>
    </div>
  );
}
