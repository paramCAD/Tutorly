/*
    Author: Parth Shah
*/

const mongoose = require("mongoose");

// Define the schema for the assignment
const QuizAttempt = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    score: { type: Number, default: 0 },
    answers: { type: Array, default: [] },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuizAttempt", QuizAttempt);
