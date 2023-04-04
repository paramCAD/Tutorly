/**
 * @author Harsh Shah
 */
const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    forum_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Discussion",
    },
    author_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    title: String,
    message: String,
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

module.exports = mongoose.model("Post", model);
