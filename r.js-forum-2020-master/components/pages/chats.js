import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export class Mychat extends Component {
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
        Axios.get('/fetchChat')
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
            <div >
                 <div className = "homePageChat" > 
                     <h1 className = "qhead">Chats...</h1>
                    
                    <div >       
                            {
                                values.length ?( values.map(data => 
                                
                                <div className = "people" key = {data._id}>
                                    
                                    <img  src = "/imageFolder/defaultpic.jpg" height = "25px"  alt = ""/>
                                    <h4>{data.username}</h4>
                                        

                                    </div>

                                )):(<h2>no posts</h2>)
                            }
                    </div> 
                    <Link style = {{textDecoration:"unset",margin:"5px",color:"black"}} to = '/network'>More...</Link>
                </div>
            </div>
        )
    }
}

export default Mychat
