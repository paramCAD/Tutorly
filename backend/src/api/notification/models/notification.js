/*
Author: Parampal Singh
*/
const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Notifications', notificationSchema)