/**
 * @author Harsh Shah
 */
const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    post_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
    },
    author_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    title: String,
    message: String,
    status: {
        type: Boolean,
        default: false,
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

module.exports = mongoose.model("PostResponse", model);
