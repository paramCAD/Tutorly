/**
 * @author Harsh Shah
 */
const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const Course = require("../../courses/models/course");
const User = require("../../userManagement/models/user");
const Forum = require("../schema/forum");
const Posts = require("../schema/posts");
const Student = require("../../students/models/student");
const Tutor = require("../../tutors/models/tutor");
const PostResponse = require("../schema/post-responses");

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createForum = async (course_id) => {
    if (!isValidObjectId(course_id)) {
        return {};
    }

    const response = await new Forum({
        course_id,
        status: "active",
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params user_id
 * @return forums
 */
const getForums = async (user_id) => {
    if (!isValidObjectId(user_id)) {
        return [];
    }

    const user = await User.findOne({
        _id: user_id,
    })
        .populate({
            path: "tutor",
            populate: {
                path: "courses",
            },
        })
        .populate({
            path: "student",
            populate: {
                path: "courses",
                populate: {
                    path: "course",
                    model: "Course",
                },
            },
        })
        .lean();

    let course_ids = [];
    if (user.student) {
        course_ids = user.student.courses.map((x) => x.course._id);
    } else {
        course_ids = user.tutor.courses.map((x) => x._id);
    }

    return await Forum.find({
        course_id: { $in: course_ids },
        status: "active",
    })
        .populate("course_id")
        .lean();
};

/**
 * @author Harsh Shah
 * @description
 * @params forum_id
 * @return get post of forum
 */
const createPostOfForum = async (author_by, forum_id, title, message) => {
    if (!isValidObjectId(forum_id) || !isValidObjectId(forum_id)) {
        return [];
    }

    const post = await new Posts({
        forum_id,
        author_by,
        title,
        message,
    }).save();

    return { id: post._id };
};

/**
 * @author Harsh Shah
 * @description
 * @params forum_id
 * @return get post of forum
 */
const getPostsOfForum = async (forum_id) => {
    if (!isValidObjectId(forum_id)) {
        return [];
    }

    return await Posts.find({
        forum_id,
    })
        .populate({ path: "author_by", select: "firstname lastname email" })
        .lean();
};

/**
 * @author Harsh Shah
 * @description
 * @params forum_id
 * @return get post of forum
 */
const getPostDetails = async (post_id) => {
    if (!isValidObjectId(post_id)) {
        return [];
    }

    const post = await Posts.findOne({
        _id: post_id,
    })
        .populate({ path: "author_by", select: "firstname lastname email" })
        .lean();

    const response = await PostResponse.find({
        post_id,
    })
        .populate({ path: "author_by", select: "firstname lastname email" })
        .lean();

    post["responses"] = response;

    return post;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createPostResponse = async (user_id, post_id, title, message) => {
    if (!isValidObjectId(user_id) || !isValidObjectId(post_id)) {
        return [];
    }

    const response = await new PostResponse({
        post_id,
        author_by: user_id,
        title,
        message,
    }).save();

    console.log(response);

    return { id: response._id };
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const updatePostOfForum = async (post_id, title, message) => {
    if (!isValidObjectId(post_id)) {
        return {};
    }

    const post = await Posts.updateOne(
        {
            _id: post_id,
        },
        {
            $set: {
                title,
                message,
                "audit.updated_on": new Date(),
            },
        }
    );

    return { id: post._id };
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const updatePostResponseOfForum = async (post_id, post_response_id, status) => {
    if (!isValidObjectId(post_id) || !isValidObjectId(post_response_id)) {
        return {};
    }

    const post = await PostResponse.updateOne(
        {
            _id: post_response_id,
        },
        {
            $set: {
                status,
            },
        }
    );

    return { id: post._id };
};

module.exports = { createForum, getForums, getPostsOfForum, createPostOfForum, getPostDetails, createPostResponse, updatePostResponseOfForum, updatePostOfForum };
