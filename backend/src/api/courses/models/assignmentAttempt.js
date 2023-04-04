/*
    Author: Parth Shah
*/

const mongoose = require("mongoose");

// Define the schema for the assignment
const AssignmentAttempt = new mongoose.Schema({
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    feedback: { type: String },
    attachments: { type: Array },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AssignmentAttempt", AssignmentAttempt);
