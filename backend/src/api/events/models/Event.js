const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    name: String,
    desc: String,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "Tutor",
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Event', Event);