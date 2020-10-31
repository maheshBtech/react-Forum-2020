import React, { Component } from "react";
import Axios from "axios";

export class Commentsforevents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments:'',
      id:this.props.id
    };
  }

  postcomments = (e) => {
    e.preventDefault();
    Axios.patch("/updateeventcomment", this.state)
      .then(() => {
        console.log("your data is posted...");
        this.props.refresh()
        this.resetForum();
        
      })
      .catch(() => {
        alert("error");
      });
  };

  resetForum = () => {
    this.setState({
      comments: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { comments } = this.state;
    // console.log(this.props)
    return (
      <div>
        <div className="comments">
          <form onSubmit={this.postcomments}>
            <input
            style = {{
                width:"79%",
                outline:"none"
            }}
              type="text"
              placeholder="Comment here..."
              name="comments"
              value={comments}
              onChange={this.handleChange}
            /><br/>
            <button style = {{marginLeft:"80%"}} type="submit">Comment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Commentsforevents;
