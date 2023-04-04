// Author: Created By: Dhairya Shah
const upload = require("../models/Upload");

const getUpload = async () => {
    return await upload.find({});
};

const createContent = async (Upload) => {
    const upload_ = await new upload(Upload);
    await upload_.save();
    return upload_;
};

const getSpecificContentbuCourseId = async (course_id) => {
    return await upload.find({ courseId: course_id });
};

module.exports = {
    getUpload,
    createContent,
    getSpecificContentbuCourseId,
};
