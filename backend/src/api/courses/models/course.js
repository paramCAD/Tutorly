const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  name: String,
  type: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: "Tutor",
  },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
  ],
  tags: [
    String
  ],
  cost: mongoose.Types.Decimal128,
  rating: mongoose.Types.Decimal128,
  description: String,
  imageURL: { type: String, default: 'https://burst.shopifycdn.com/photos/hard-cover-books-on-blue-background.jpg' }
});

module.exports = mongoose.model("Course", Course);
