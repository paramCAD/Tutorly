const Service = require("../services/services");
const Tutor = require("../models/tutor");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Arshdeep Singh
 * @description Get all tutors from the database
 * @params req, res
 * @return tutors
 */
router.get("/all", async (req, res) => {
    try {
        const tutors = await Service.getAllTutors();
        console.log("tutors", tutors);
        return res.status(200).json({
            message: "Fetched all tutors",
            success: true,
            data: tutors,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve tutors.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Register a new tutor
 * @params req, res
 * @return tutors
 */
 router.post("/add", async (req, res) => {
    try {
        const tutor = req.body.tutor;
        if(!tutor){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: Object.keys(Tutor.schema.tree)
            }});
        }
        const newTutor = await Service.createTutor(tutor);
        return res.status(200).json({
            message: "Added a new tutor",
            success: true,
            data: newTutor,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to register the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Update an existing tutor
 * @params req, res
 * @return tutors
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const rawTutorId = req.params.id;
        if(!rawTutorId){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawTutorId)){
            return Utils.idNotValidBsonObjectId(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        const tutorId = rawTutorId;
        const tutor = req.body.tutor;
        if(!tutor){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: Object.keys(Tutor.schema.tree)
            }});
        }
        const updatedTutor = await Service.updateTutor(tutorId, tutor);
        return res.status(200).json({
            message: "Updated the tutor",
            success: true,
            data: await Service.getSpecificTutor(tutorId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Get a specific tutor
 * @params req, res
 * @return tutor
 */
 router.get("/:id", async (req, res) => {
    try {
        const rawTutorId = req.params.id;
        if(!rawTutorId){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawTutorId) === false){
            return Utils.idNotValidBsonObjectId(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        const tutorId = rawTutorId;
        const tutor = await Service.getSpecificTutor(tutorId);
        console.log(tutor)
        return res.status(200).json({
            message: "Obtained the specific tutor",
            success: true,
            data: tutor,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the tutor.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Delete a specific tutor
 * @params req, res
 * @return tutors
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const rawTutorId = req.params.id;
        if(!rawTutorId){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawTutorId) === false){
            return Utils.idNotValidBsonObjectId(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        const tutorId = rawTutorId;
        const result = await Service.deleteTutor(tutorId);
        if(result && result.deletedCount === 0){
            return res.status(200).json({
                message: "No matching records found",
                success: true,
                data: tutorId,
            });
        }else{
            return res.status(200).json({
                message: "Deleted the specific tutor",
                success: true,
                data: tutorId,
            });
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the tutor.",
            success: false,
        });
    }
});


/**
 * @author Arshdeep Singh
 * @description Get all courses taught by tutor
 * @params req, res
 * @return courses
 */
 router.get("/:id/courses", async (req, res) => {
    try {
        const rawTutorId = req.params.id;
        if(!rawTutorId){
            return Utils.requiredRequestBodyNotFound(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawTutorId) === false){
            return Utils.idNotValidBsonObjectId(res, "tutor", {tutor: {
                param: "id"
            }});
        }
        const tutorId = rawTutorId;
        const { courses } = await Service.getAllCoursesByTutor(tutorId);
        return res.status(200).json({
            message: "Obtained all the courses offered by tutor",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the courses by tutor.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all students that the tutors can be recommended for
 * @params req, res
 * @return students
 */
 router.post("/student/recommendations", async (req, res) => {
    try {
        const { id: tutorId } = req.body.tutor;
        const courses = await Service.recommendStudents(tutorId);
        return res.status(200).json({
            message: "Sucessfully got the student recommendations.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the student recommendations.",
            success: false,
        });
    }
});

module.exports = router;
