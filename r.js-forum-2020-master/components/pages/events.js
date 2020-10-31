import React, { Component } from 'react'
import Axios from 'axios'
import ReactPlayer from 'react-player'
import Commentsforevents from './commentsforevents'

export class Events extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts:[],
             pics:'',
             comment:''

        }
    }
    componentDidMount = () =>
    {
        this.fetcheventposts()
    }

    fetcheventposts = () =>
    {
        Axios.get('/fetcheventpost')
        .then((res) =>
        {
            this.setState({
                posts:res.data
            })
            // console.log(this.state.posts)
        })
        .catch((err) =>
        {
            console.log(err)
        })
    }

    restpage = () =>
    {
        this.setState({
            comment:"",
            pics:""
        })
    }
    
    handlechange = (e) =>
    {
        this.setState({
            pics:e.target.files[0]
        })
    }
    handleComment = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitpost = async(e) =>
    {
        e.preventDefault();
    const data = new FormData();
    data.append(`pic`,this.state.pics)
    data.append('desc',this.state.comment)

        try{
            await Axios.post('/uploadposts',data)
           .then((res) =>
           {
            //    console.log(res)
               this.restpage()
               this.fetcheventposts()
           
           })
           .catch((err)=>
           {
               console.log(err)
           })
        }
        catch(err)
        {
            console.log(err)
        }   

    }


    
    render() {
        const {comment,posts} = this.state
        return (
            <div className = "eventContainer">
                <div id = "EventoutBox">
                <div className = "eventBox">
                <form onSubmit = {this.submitpost} >
                    <h2 style = {{fontWeight:"lighter"}}>Start a post</h2>

                    <input type = "text" placeholder = "Start here by writing something..."
                    name="comment"
                    value = {comment}
                    onChange = {this.handleComment}
                    
                    /><br/>
                    <label  htmlFor = "file">Photo</label>
                    <label htmlFor = "file">Video</label>
                    {/* <label htmlFor = "file">Document</label> */}
                    <input id = "file" type = "file"
                    onChange = {this.handlechange}
                    
                        />
                    <button type = "submit">Post</button> 

                    </form>
                </div>
                <h1 style = {{textAlign:"center",fontSize:"20px"}}>Latest Posts</h1>
                <div id = "latestpost">
                <div> 
                    {
                        posts.length?posts.map(post =>
                            (
                                <div className = "newpost" key = {post._id}>
                                   
                                    <h4 style = {{fontWeight:"lighter"}}>{post.desc}</h4>
                                  
                                    {
                                        post.videopath?
                                        <div  >
                                            <ReactPlayer  width = "600px" controls url ={post.videopath}/>
                                            </div>
                                            :null
                                    }
                                     {
                                        post.path?
                                        <div>
                                              <img style = {{width:"100%",height:"250px",objectFit:"contain"}} src = {post.path} alt = ""/>
                                            </div>
                                            :null
                                    }
                                    <h4 style = {{fontWeight:"lighter"}}> Comments: {post.comments}</h4>

                                    <Commentsforevents id={post._id} refresh = {this.fetcheventposts}/>
                                </div>

                                

                            )):<h2>No posts</h2>
   
                    }

                    </div>
                   

                </div>
                {/* <ReactPlayer  controls url = "uploads/1600164067994-VID-20180519-WA0020.mp4"/> */}

                </div>
               
                </div>
            
        )
    }
}

export default Events
