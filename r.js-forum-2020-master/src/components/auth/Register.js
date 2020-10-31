import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import {Link} from 'react-router-dom'
// import AuthOptions from './AuthOptions'
import '../../App.css'

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username,setUsername] = useState();
  const [college,setCollege] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {username, email, password,college};
      await Axios.post("/save", newUser);

      const loginRes = await Axios.post("/login", {
        email,
        password,
      });
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
    <div >
      {/* <AuthOptions /> */}
      <h1 className = "heading2">
            Join here!
      </h1>
      
      <div id = "register">
        
    {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
    </div>

      <form onSubmit={submit} className = "register">
        <input
        id = "register-username"
        placeholder = "Enter username"
        type = "text"
        onChange = {(e) => setUsername(e.target.value)}   
        />


        <input
        id = "register-collegeName"
        placeholder = "Enter college Name"
        type = "text"
        onChange = {(e) => setCollege(e.target.value)}   
        />
       
        <input
          id="register-email"
          placeholder = "enter email_id"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

     
        <input
          id="register-password"
          placeholder = "Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type = "submit">Join now</button>
        <h4>Already have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/">Click here</Link></h4>
      </form>
    </div>
  );
}
