import React, { Component } from 'react'
import Axios from 'axios'

export class SharePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             post:'',
             values:[]
        }
    }
    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }    
        submit = (e) =>
        {
            
            e.preventDefault();
            Axios.post('/savePost',this.state)
            .then((res) =>
            {
                console.log(res)
                this.reset()
            })
            .catch((err) =>
            {
                console.log(err)
            })
        }
        reset = () =>
        {
            this.setState({
                post:''
            },this.fetchpost())
        }

        componentDidMount = () =>{
            this.fetchpost()
        }
    

    fetchpost = () =>
    {
        Axios.get('/fetchposts')
        .then((res) =>
        {
            this.setState({
                values : res.data
            })
        })
        .catch((err) =>
        {
            console.log(err)
        })
    }

    render() { 
        const {post,values} = this.state
        return (
            <div className = "postContainer">



                <div className = "postBox" >
                
                    
                <h1 style = {{fontWeight : "lighter"}}>Post your ideas here...</h1>
                <form onSubmit = {this.submit}>
                
                    <input type = "text"
                    placeholder = "What do you want to post about?"
                    name = "post"
                    value = {post}
                    onChange = {this.handleChange}
                     />
                     <button type = "submit">Post</button>

                </form>
            
            



                 <h1 style = {{textAlign:"center",fontSize:"20px"}}>Latest Posts</h1>
                <div className = "fetchpost">
                    <div> 
                    {
                        values.length?values.map(posts =>
                            (
                                <div className = "Pnewpost" key = {posts._id}>
                                    <h4 style = {{fontWeight:"lighter"}}>{posts.post}</h4>
                                <h4 style = {{fontWeight:"lighter",fontSize:"10px"}}> Posted on :- {posts.date}</h4>
                                       </div>

                            )):<h2>No posts</h2>

                    }

                    </div>
                </div>

               
                </div> 
            </div>
        )
    }
}

export default SharePost
