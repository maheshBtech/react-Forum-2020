import React, { Component } from "react";
import Axios from "axios";

export class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer:'',
      id:this.props.id
    };
  }

  postAnswer = (e) => {
    e.preventDefault();
    Axios.patch("/updateAns", this.state)
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
      answer: "",
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { answer } = this.state;
    // console.log(this.props)
    return (
      <div>
        <div className="comments">
          <form onSubmit={this.postAnswer}>
            <input
              type="text"
              placeholder="Your answer..."
              name="answer"
              value={answer}
              onChange={this.handleChange}
            />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Answer;
