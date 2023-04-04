/*
Author: Parampal Singh
*/
const express = require('express')
const router = express.Router()
const {getNotifications, 
    sendNotifications, 
    updateFavorites, 
    updatePreference, 
    getFavoriteNotifications, 
    getUserNotificationDetails, 
    setUserNotificationDetails,
    getSentNotifications} = require('../controllers/notification')

// Fetch notifications of a user (id is user id)
router.get('/:id', getNotifications)

// Create a new notification
router.post('/', sendNotifications)

// Fetch notification details of a user ( id is user id)
router.get('/details/:id', getUserNotificationDetails)

// Add notification details of a user 
router.post('/details/', setUserNotificationDetails)

// Update user choice enable or disable notification ( id is user id)
router.put('/preference/:id', updatePreference)

// Fetch favorite notifications
router.get('/favorite/:id', getFavoriteNotifications)

// Star or un-star a notification (id is user id)
router.put('/favorite/:id', updateFavorites)

// Fetch sent notifications by tutor (id is tutor id)
router.get('/tutor/:id', getSentNotifications)

module.exports = router