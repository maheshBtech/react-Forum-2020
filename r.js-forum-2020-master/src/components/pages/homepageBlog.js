
import React,{ useContext } from 'react'
import UserContext from '../../context/userContext';
// import Axios from 'axios'
// import {useHistory} from 'react-router-dom'

function HomepageBlog() {
    const { userData } = useContext(UserContext);

   

    return (
        <div>
            <div className = "HomeblogContainer">
                <h1 style = {{fontWeight : "lighter"}}>Welcome</h1>
            <div className = "">
          
            {
                <div>
                    <img style = {{borderRadius:"50px",marginBottom:"10px"}} src = {userData.user.profilepic} alt = "" height = "200px"/>
                     
                <h3> {userData.user.username}</h3>
                <h4 style = {{fontWeight : "lighter"}}>{userData.user.college}</h4>
                    </div>
            }
           
            </div>
            </div>
            
        </div>
    )
}

export default HomepageBlog
