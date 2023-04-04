/**
 * @author Harsh Shah
 */
const mongoose = require("mongoose");

const model = new mongoose.Schema({
    id: String,
    status: String,
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
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

module.exports = mongoose.model("conversation", model);
