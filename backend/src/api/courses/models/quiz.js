/*
    Author: Parth Shah
*/

const mongoose = require("mongoose");

// Define the schema for the assignment
const Quiz = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    questions: { type: Array, required: true },
    timeAllowed: { type: Number, required: true },
});

module.exports = mongoose.model("Quiz", Quiz);
