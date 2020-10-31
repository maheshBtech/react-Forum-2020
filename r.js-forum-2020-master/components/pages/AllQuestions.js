import React, { Component } from "react";
import Axios from "axios";
import Answer from "./Answer";
export class AllQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      
    };
  }
  componentDidMount = () => {
    this.fetchQuestions();
  };

  fetchQuestions = () => {
    Axios.get("/getAllQues")
      .then((res) => {
        const data = res.data;
        this.setState({
          values: data,
        });
      })
      .catch(() => {
        alert("error in retriving data....");
      });
  };

 


  render() {
    const { values } = this.state;
    return (
      <div className="quscontainer">
        <div id="quess">
          <div id="qdiv">
            <h1 className="qhead">Public Questions</h1>

            {
              <div id="count">
                <h4 id="qbutton">Total Questions: {values.length}</h4>
              </div>
            }
          </div>

          <div className="ques">
            {values.length ? (
              values.map((data) => (
                <div className="qborder" key={data._id}>
                  <h2 style={{ fontSize: "16px" }}>{data.question}</h2>
                  <p style={{ fontSize: "10px" }}>Posted on:{data.date}</p>
              <h3 style={{ fontSize: "16px",fontWeight:"lighter" }}>Ans:- {data.answer}</h3>


             

        <Answer id={data._id} refresh = {this.fetchQuestions}/>
                </div>
              ))
            ) : (
              <h2>no posts</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default AllQuestions;
