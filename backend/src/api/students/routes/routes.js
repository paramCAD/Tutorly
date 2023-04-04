const Service = require("../services/services");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Archives a specific course for a student
 * @params req, res
 * @return boolean
 */
router.post("/course/archive/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;
        const student = await Service.archiveCourse(studentId, courseId);
        return res.status(200).json({
            message: "Archived the course.",
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to archive the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Unarchives a specific course for a student
 * @params req, res
 * @return boolean
 */
router.post("/course/unarchive/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;
        const student = await Service.unArchiveCourse(studentId, courseId);
        return res.status(200).json({
            message: "Unarchived the course.",
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to unarchive the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get a specific course progress for a student
 * @params req, res
 * @return number
 */
router.get("/course/progress/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;
        const student = await Service.getCourseProgress(studentId, courseId);
        if (student) {
            return res.status(200).json({
                message: "Retrieved the course progress.",
                success: true,
                data: student,
            });
        } else {
            return res.status(200).json({
                message: "Unable to retrieved the course progress as the student hasn't enrolled for this course.",
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the course progress.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Set a specific course progress for a student
 * @params req, res
 * @return number
 */
router.put("/course/progress/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;
        const student = await Service.setCourseProgress(studentId, courseId, courseProgress);
        if (student) {
            return res.status(200).json({
                message: "Updated the course progress.",
                success: true,
                data: student,
            });
        } else {
            return res.status(200).json({
                message: "Unable to set the course progress as the student hasn't enrolled for this course.",
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to set the course progress.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses that the student has enrolled
 * @params req, res
 * @return courses
 */
router.post("/courses/enrolled", async (req, res) => {
    try {
        const { id: rawStudentId } = req.body?.student;
        if(!rawStudentId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "id"
            }});
        }
        const studentId = rawStudentId;
        const courses = await Service.getAllEnrolledCourses(studentId);
        return res.status(200).json({
            message: "Sucessfully set the course progress.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the courses enrolled.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses that the student has archived
 * @params req, res
 * @return courses
 */
router.post("/courses/archived", async (req, res) => {
    try {
        const { id: rawStudentId } = req.body.student;
        if(!rawStudentId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "id"
            }});
        }
        const studentId = rawStudentId;
        const courses = await Service.getAllArchivedCourses(studentId);
        return res.status(200).json({
            message: "Sucessfully set the course progress.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to set the course progress.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Unenrolls a student from a specific course
 * @params req, res
 * @return boolean
 */
router.post("/course/unenroll/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;
        const { newCourse: course, newStudent: student } = await Service.unenrollFromACourse(studentId, courseId);
        return res.status(200).json({
            message: "Student un enrolled from the course.",
            success: true,
            data: student,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to enroll student the course.",
            success: false,
        });
    }
});

/**
* @author Arshdeep Singh
* @description Unenrolls a student from a course
* @params req, res
* @return boolean
*/
router.post("/course/enroll/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        const { id: rawStudentId } = req.body.student;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "course id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "student id"
            }});
        }
        const courseId = rawCourseId;
        const studentId = rawStudentId;

        const { newCourse: course, newStudent: student } = await Service.enrollInACourse(studentId, courseId);
        return res.status(200).json({
            message: "Student enrolled in the course.",
            success: true,
            data: { student: student, course: course },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to enroll in the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses that the student can be recommended for
 * @params req, res
 * @return courses
 */
 router.post("/courses/recommendations", async (req, res) => {
    try {
        const { id: rawStudentId } = req.body.student;
        if(!rawStudentId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "id"
            }});
        }
        const courses = await Service.getCourseRecommendations(rawStudentId);
        return res.status(200).json({
            message: "Sucessfully got the course recommendations.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the course recommendations.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all tutors that the student can be recommended for
 * @params req, res
 * @return tutors
 */
 router.post("/tutors/recommendations", async (req, res) => {
    try {
        const { id: rawStudentId } = req.body.student;
        if(!rawStudentId){
            return Utils.requiredRequestBodyNotFound(res, "student", {student: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawStudentId)){
            return Utils.idNotValidBsonObjectId(res, "student", {student: {
                param: "id"
            }});
        }
        const courses = await Service.getTutorRecommendations(rawStudentId);
        return res.status(200).json({
            message: "Sucessfully got the tutor recommendations.",
            success: true,
            data: courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to get the tutor recommendations.",
            success: false,
        });
    }
});

module.exports = router;
