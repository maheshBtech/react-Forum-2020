import React, { Component } from 'react'
import Axios from 'axios'

export class Mynetwork extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             values:[]
        }
    }
    componentDidMount =  () =>
    {
        this.fetchpeople()
    }
    
    fetchpeople = () =>
    {
        Axios.get('/fetchPeople')
        .then((res) =>
        {
            const data  = res.data;
            this.setState({
                values:data
            })
        })
        .catch(    () =>
        {
            alert("error in retriving data....")
        })
    }
    
    render() {
        const {values} = this.state
        return (
            <div className = "quscontainer">
                 <div id = "quess"> 
                     <h1 className = "qhead">Peoples you may know</h1>
                     {
               <div id = "count">
                   <h4 id = "qbutton">Total Members:{values.length} </h4>
                   </div>
                   }
                    <div className = "peopleContainer">       
                            {
                                values.length ?( values.map(data => 
                                
                                <div className = "Mynetwork" key = {data._id}>
                                    <img  src = "/imageFolder/defaultpic.jpg" height = "90px"  alt = ""/>
                                    <h3>{data.username}</h3>
                                    <h4 style = {{fontWeight:"lighter"}}>{data.email}</h4>

                                    </div>

                                )):(<h2>no posts</h2>)
                            }
                    </div> 
                </div>
                
               

                
                
                
            </div>
        )
    }
}

export default Mynetwork
