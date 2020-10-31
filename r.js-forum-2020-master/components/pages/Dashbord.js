import React, { Component } from 'react'
import{Link} from 'react-router-dom'



  

 class Dashbord extends Component {
    render() {
        return (
            
               <div id = "navbar"> 
                
                 <Link to = '/homePage'>Home</Link>
                 <Link to = "/ques">Public questions</Link>
                <Link to = '/myblog'> My blog</Link>
                <Link to = '/network'> My network</Link>
                <Link to = '/active'>Active</Link>
                {/* <Link to = '/events'>Events</Link> */}
                
                <Link to = '/sharepost'>posts</Link>
                
               </div>

              
               

        )
    }
}

export default Dashbord
