import React, { Component } from 'react'
import Axios from "axios";
export class News extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             events:[]
        }
    }
    componentDidMount = () =>
    {
        this.fetchEvents()

    }

    fetchEvents = () =>
    {
        Axios.get('/getEvents')
        .then((res) =>{
            this.setState({
                events:res.data
            })
        })
        .catch((err) =>{
            alert(err)

        })
    }
    
    render() {
        const {events} = this.state
        return (
            <div >
            <div className = "quesschat">
                <h2>Today’s news and views</h2>
                <div>
                    {
                        events.length?
                        events.map(event =>
                            <div key = {event._id}>
                                <ul>
                                <li>{event.eventt}</li>
                                
                                </ul>
                                </div>
                            ):<h3>No events and posts</h3>
                    }
                </div>
                
                
            </div>
         </div>
        )
    }
}

export default News
