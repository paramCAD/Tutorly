const mongoose = require('mongoose');

const LearningPath = new mongoose.Schema({
    name: String,
    desc: String,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "Tutor",
    },
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Course",
        },
    ],
});

module.exports = mongoose.model('LearningPath', LearningPath);