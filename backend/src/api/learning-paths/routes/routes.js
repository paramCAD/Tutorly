const Service = require("../services/services");
const LearningPath = require("../models/LearningPath");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Arshdeep Singh
 * @description Get all learningPaths from the database
 * @params req, res
 * @return learningPaths
 */
router.get("/all", async (req, res) => {
    try {
        const learningPaths = await Service.getAllLearningPaths();
        console.log("learningPaths", learningPaths);
        return res.status(200).json({
            message: "Fetched all learningPaths",
            success: true,
            data: learningPaths,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve learningPaths.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Register a new learningPath
 * @params req, res
 * @return learningPaths
 */
 router.post("/add", async (req, res) => {
    try {
        const learningPath = req.body.learningPath;
        if(!learningPath){
            return Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: Object.keys(LearningPath.schema.tree)
            }});
        }
        const newLearningPath = await Service.createLearningPath(learningPath);
        return res.status(200).json({
            message: "Added a new learningPath",
            success: true,
            data: newLearningPath,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to register the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Update an existing learningPath
 * @params req, res
 * @return learningPaths
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const rawLearningPathId = req.params.id;
        if(!rawLearningPathId){
            return Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawLearningPathId)){
            return Utils.idNotValidBsonObjectId(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        const learningPathId = rawLearningPathId;
        const learningPath = req.body.learningPath;
        if(!learningPath){
            return Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: Object.keys(LearningPath.schema.tree)
            }});
        }
        const updatedLearningPath = await Service.updateLearningPath(learningPathId, learningPath);
        return res.status(200).json({
            message: "Updated the learningPath",
            success: true,
            data: await Service.getSpecificLearningPath(learningPathId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Get a specific learningPath
 * @params req, res
 * @return learningPath
 */
 router.get("/:id", async (req, res) => {
    try {
        const rawLearningPathId = req.params.id;
        if(!rawLearningPathId){
            return Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawLearningPathId) === false){
            return Utils.idNotValidBsonObjectId(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        const learningPathId = rawLearningPathId;
        const learningPath = await Service.getSpecificLearningPath(learningPathId);
        console.log(learningPath)
        return res.status(200).json({
            message: "Obtained the specific learningPath",
            success: true,
            data: learningPath,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the learningPath.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Delete a specific learningPath
 * @params req, res
 * @return learningPaths
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const rawLearningPathId = req.params.id;
        if(!rawLearningPathId){
            return Utils.requiredRequestBodyNotFound(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawLearningPathId) === false){
            return Utils.idNotValidBsonObjectId(res, "learningPath", {learningPath: {
                param: "id"
            }});
        }
        const learningPathId = rawLearningPathId;
        const result = await Service.deleteLearningPath(learningPathId);
        if(result && result.deletedCount === 0){
            return res.status(200).json({
                message: "No matching records found",
                success: true,
                data: learningPathId,
            });
        }else{
            return res.status(200).json({
                message: "Deleted the specific learningPath",
                success: true,
                data: learningPathId,
            });
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the learningPath.",
            success: false,
        });
    }
});


module.exports = router;
