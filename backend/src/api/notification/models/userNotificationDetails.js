/*
Author: Parampal Singh
*/
const mongoose = require('mongoose')

const userNotificationDetailsSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    preference:{
        type: String,
        required: true
    },
    favorites:{
        type:[String],
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('UserNotificationDetails', userNotificationDetailsSchema)