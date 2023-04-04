/**
 * @author Harsh Shah
 */
const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    status: String,
    course_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
    },
    audit: {
        created_on: {
            type: Date,
            default: Date.now,
        },
        updated_on: {
            type: Date,
            default: Date.now,
        },
    },
});

module.exports = mongoose.model("Discussion", model);
