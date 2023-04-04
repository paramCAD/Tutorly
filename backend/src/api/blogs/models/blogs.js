const mongoose = require("mongoose");


const User = mongoose.model(
  "blogs",
  new mongoose.Schema({
    title: String,
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
    img:Buffer,
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
  })
);

module.exports = User;