// Author: Created By: Dhairya Shah
const mongoose = require('mongoose');

const upload = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    textContent: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
}, { timestamps: true });

// module.exports = mongoose.model.upload || mongoose.model('upload', upload);
mongoose.model.upload = mongoose.model.upload || mongoose.model("upload", upload);
module.exports = mongoose.model.upload;