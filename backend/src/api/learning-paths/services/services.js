const LearningPath = require("../models/LearningPath");

const getAllLearningPaths = async () => {
    return await LearningPath.find({});
}

const createLearningPath = async (learningPath) => {
    const learningPath_ = await new LearningPath(learningPath);
    await learningPath_.save();
    return learningPath_;
}

const getSpecificLearningPath = async (id) => {
    return await LearningPath.find({_id : id});
}

const updateLearningPath = async (id, learningPath) => {
    const learningPath_ = await LearningPath.updateOne({ _id: id }, 
        { $set: learningPath }, 
        { upsert: true });
    return learningPath_;
}

const deleteLearningPath = async(id) => {
    return await LearningPath.deleteOne({_id : id});
}

const getAllCoursesByLearningPath = async(id) => {
    return await LearningPath.find({_id : id}).courses;
}


module.exports = {
    getAllLearningPaths,
    createLearningPath,
    getSpecificLearningPath,
    updateLearningPath,
    deleteLearningPath,
    getAllCoursesByLearningPath,
}