const mongoose = require("mongoose");

const Tutor = new mongoose.Schema({
    name: String,
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Course",
        },
    ],
    rating: mongoose.Types.Decimal128,
    description: String,
    imageURL: String,
});

module.exports = mongoose.model("Tutor", Tutor);
