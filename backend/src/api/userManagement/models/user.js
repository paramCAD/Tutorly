/*
    Author: Manasvi(mn838732@dal.ca)
*/

const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        mode: String,
        status: {
            type: String,
            enum: ["Pending", "Active"],
            default: "Pending",
        },
        confirmationCode: {
            type: String,
            unique: true,
        },
        role: String,
        resetpasswordOTP: {
            type: String,
        },
        tutor: {
            type: mongoose.Schema.ObjectId,
            ref: "Tutor",
        },
        student: {
            type: mongoose.Schema.ObjectId,
            ref: "Student",
        },
    })
);

module.exports = User;
