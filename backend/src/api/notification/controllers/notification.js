/*
Author: Parampal Singh
*/
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Notifications = require('../models/notification')
const UserNotificationDetailsSchema = require('../models/userNotificationDetails')

/**
 * @author Parampal Singh
 * @description Get all notifications of a user
 * @params req, res
 * @return all notifications
 */
const getNotifications = asyncHandler(async (req, res) => {
    try {
        const userNotificationDetails = await UserNotificationDetailsSchema.findOne({user: req.params.id}).exec()
        const notifications = await Notifications.find({"createdAt" : {$gte:userNotificationDetails.createdAt}}).sort({ createdAt: -1 })

        res.status(200).json({
            message: notifications.length,
            success: true,
            notification: notifications
        });

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Send notifications
 * @params req, res
 * @return notification after saving it
 */
const sendNotifications = asyncHandler(async (req, res) => {
    try {
        if(!req.body.text){
            res.status(400)
            throw new Error('Please add a notification description')
        }
        if(!req.body.type){
            res.status(400)
            throw new Error('Please select a valid notification type')       
        }

        const notification = await Notifications.create({
            text: req.body.text,
            type: req.body.type,
            user: req.body.user
        })

        res.status(200).json({
            message: 'Send notifications',
            success: true,
            notification: notification     
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Get notificational details of a user
 * @params req, res
 * @return notification details
 */
const getUserNotificationDetails = asyncHandler(async (req, res) => {
    try {
        const userNotificationDetails = await UserNotificationDetailsSchema.findOne({user: req.params.id}).exec()

        res.status(200).json({
            message: 'Get user notification details',
            success: true, 
            userNotificationDetails: userNotificationDetails
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error:error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Set notificational details of a user
 * @params req, res
 * @return notification details
 */
const setUserNotificationDetails = asyncHandler(async (req, res) => {
    try {

        if(!req.body.preference){
            res.status(400)
            throw new Error('Please select a valid notification prference')
        }
        if(!req.body.favorites){
            res.status(400)
            throw new Error('Please select a valid notification to favorite')       
        }    
        const getUserNotificationDetails = await UserNotificationDetailsSchema.findOne({user: req.body.user}).exec();

        if(getUserNotificationDetails === null)
        {
            const userNotificationDetails = await UserNotificationDetailsSchema.create({
                favorites: req.body.favorites,
                preference: req.body.preference,
                user: req.body.user
            })

            res.status(200).json({
                message: 'Get user notification details',
                success: true,
                userNotificationDetails: userNotificationDetails
            });
        }

        res.status(200).json({
            message: 'Get user notification details',
            success: true,
            userNotificationDetails: getUserNotificationDetails
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Update notification preference (On/ Off)
 * @params req, res
 * @return updated notification details
 */
const updatePreference = asyncHandler(async (req, res) => {
    try {
        if(!req.body.preference){
            res.status(400)
            throw new Error('Please select a valid preference')
        }
        const updateUserNotificationDetails = await UserNotificationDetailsSchema.findOneAndUpdate(
            {user:req.params.id}, {$set: {preference:req.body.preference}}, {new:true})
        
        res.status(200).json({
            message: 'Update user notification preferences',
            success: true,
            updateUserNotificationDetails: updateUserNotificationDetails
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error:error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Get favorite notifications
 * @params req, res
 * @return favorite notifications
 */
const getFavoriteNotifications = asyncHandler(async (req, res) => {
    try {
        const userNotificationDetails = await UserNotificationDetailsSchema.findOne({user: req.params.id}).exec()

        const starNotifications = await Notifications.find().sort({ createdAt: -1 }).where('_id').in(userNotificationDetails.favorites).exec();

        res.status(200).json({
            message: 'Get favorite notifications',
            success: true,
            starNotifications: starNotifications
        });

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error:error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Update favorite notification list
 * @params req, res
 * @return success message 
 */
const updateFavorites = asyncHandler(async (req, res) => {
    try {
        if(!req.body.favorite){
            res.status(400)
            throw new Error('Please select a valid favorite')
        }

        if(!req.body.notificationId){
            res.status(400)
            throw new Error('Please select a valid notification to favorite')
        }

        if(req.body.favorite == "false") // remove notification from favorites
        {
            await UserNotificationDetailsSchema.findOneAndUpdate({
                user:req.params.id
            },{
                $pull:{
                    favorites: req.body.notificationId
                }
            })
        }
        else
        {
            await UserNotificationDetailsSchema.findOneAndUpdate({
                user:req.params.id
            },{
                $addToSet:{
                    favorites: req.body.notificationId
                }
            })
        }
        res.status(200).json({
            message: 'Update notification favorites',
            success: true
        });
    }

    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error:error
        });
    }
})

/**
 * @author Parampal Singh
 * @description Get notifications sent by a tutuor
 * @params req, res
 * @return notifications by a tutor
 */
const getSentNotifications = asyncHandler(async (req, res) => {
    try {
        const userSentNotifications = await Notifications.find({user: req.params.id}).sort({ createdAt: -1 }).exec()
        res.status(200).json({
            message: 'Get sent notifications',
            success: true,
            userSentNotifications: userSentNotifications
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error:error
        });
    }
})

module.exports = {
    getNotifications,
    sendNotifications,
    updateFavorites,
    updatePreference,
    getUserNotificationDetails,
    getFavoriteNotifications,
    getSentNotifications, 
    setUserNotificationDetails
}