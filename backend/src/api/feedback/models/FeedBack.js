// Author: Created By: Dhairya Shah
const mongoose = require('mongoose');

const FeedBack = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('FeedBack', FeedBack);