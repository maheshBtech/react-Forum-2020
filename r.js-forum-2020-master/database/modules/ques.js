const mongoose = require("mongoose");

const userQues = mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const ques = mongoose.model("Question", userQues);
module.exports = ques;
