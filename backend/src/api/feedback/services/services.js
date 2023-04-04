// Author: Created By: Dhairya Shah
const FeedBack = require("../models/FeedBack");

const getAllFeedBacks = async () => {
    return await FeedBack.find({});
}

const createFeedBack = async (feedback) => {
    const feedback_ = await new FeedBack(feedback);
    await feedback_.save();
    return feedback_;
}

const getSpecificFeedBackByUserId = async (user_id) => {
    return await FeedBack.find({userId : user_id});
}

const getSpecificFeedBackByCourseId = async (course_id) => {
    return await FeedBack.find({courseId : course_id});
}

const getSpecificFeedBackByUserAndCourseId = async (user_id,course_id) => {
    return await FeedBack.find({courseId : course_id, userId: user_id});
}

module.exports = {
    getAllFeedBacks,
    createFeedBack,
    getSpecificFeedBackByUserId,
    getSpecificFeedBackByCourseId,
    getSpecificFeedBackByUserAndCourseId    
}