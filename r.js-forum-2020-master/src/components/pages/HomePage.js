import React, { Component } from "react";
// import Axios from "axios";
// import Answer from "./Answer";

import Mychat from "./chats";
import News from "./news";
import HomepageBlog from "./homepageBlog";
import Events from "./events";



export class HomePage extends Component {
  render() {
    return (
        <div className = "homeContainer">
          
           <div className = "chart">
           <HomepageBlog/>
           </div>
          <div >
          <Events />
          </div>
          
     <div className = "chart">
         <News/>
     <Mychat/>
     </div>
    </div>  
    );
  }
}
export default HomePage;
