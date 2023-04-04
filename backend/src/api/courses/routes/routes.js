const Service = require("../services/services");
const QuizService = require("../services/quiz");
const AssignmentService = require("../services/assignment");
const Course = require("../models/course");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get all courses from the database
 * @params req, res
 * @return courses
 */
router.get("/all", async (req, res) => {
    try {
        const courses = await Service.getAllCourses();
        console.log("courses", courses);
        return res.status(200).json({
            message: "Fetched all courses",
            success: true,
            data: courses,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve courses.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Create a new course
 * @params req, res
 * @return courses
 */
router.post("/add", async (req, res) => {
    try {
        const course = req.body.course;
        if (!course) {
            return Utils.requiredRequestBodyNotFound(res, "course", {
                course: {
                    param: Object.keys(Course.schema.tree),
                },
            });
        }
        const newCourse = await Service.createCourse(course);
        return res.status(200).json({
            message: "Added a new course",
            success: true,
            data: newCourse,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to create the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Update an existing course
 * @params req, res
 * @return courses
 */
router.put("/update/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "course", {course: {
                param: "id"
            }});
        }
        const courseId = rawCourseId;
        const course = req.body.course;
        if (!course) {
            return Utils.requiredRequestBodyNotFound(res, "course", {
                course: {
                    param: Object.keys(Course.schema.tree),
                },
            });
        }
        const updatedCourse = await Service.updateCourse(courseId, course);
        return res.status(200).json({
            message: "Updated the course",
            success: true,
            data: await Service.getSpecificCourse(courseId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Get a specific course
 * @params req, res
 * @return courses
 */
router.get("/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "course", {course: {
                param: "id"
            }});
        }
        const courseId = rawCourseId;
        const course = await Service.getSpecificCourse(courseId);
        return res.status(200).json({
            message: "Obtained the specific course",
            success: true,
            data: course,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the course.",
            success: false,
        });
    }
});

/**
 * @author Bharatwaaj Shankaranarayanan
 * @description Delete a specific course
 * @params req, res
 * @return courses
 */
router.delete("/delete/:id", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "course", {course: {
                param: "id"
            }});
        }
        const courseId = rawCourseId;
        const result = await Service.deleteCourse(courseId);
        if(result && result.deletedCount === 0){
            return res.status(200).json({
                message: "No matching records found",
                success: true,
                data: courseId,
            });
        }else{
            return res.status(200).json({
                message: "Deleted the specific course",
                success: true,
                data: courseId,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the course.",
            success: false,
        });
    }
});


/**
 * @author Arshdeep Singh
 * @description Get all the students in a specific course
 * @params req, res
 * @return students
 */
router.get("/:id/students", async (req, res) => {
    try {
        const rawCourseId = req.params.id;
        if(!rawCourseId){
            return Utils.requiredRequestBodyNotFound(res, "course", {course: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawCourseId)){
            return Utils.idNotValidBsonObjectId(res, "course", {course: {
                param: "id"
            }});
        }
        const courseId = rawCourseId;
        const students = await Service.getAllStudents(courseId);
        return res.status(200).json({
            message: "Obtained all the students enrolled in the specific course",
            success: true,
            data: students,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve students from the course.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Create a new quiz for the specific course
 * @params req, res
 * @return status
 */
router.put("/:id/quiz/new", async (req, res) => {
    try {
        const quiz = req.body.quiz;
        if (!quiz) {
            return Utils.requiredRequestBodyNotFound(res, "quiz", {
                quiz: {},
            });
        }
        quiz.course = req.params.id;
        await QuizService.createQuiz(quiz);
        return res.status(200).json({
            message: "Quiz created Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while create a quiz",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Delete an existing quiz for the specific course
 * @params req, res
 * @return status
 */
router.delete("/:id/quiz/:quizId", async (req, res) => {
    try {
        const quizId = req.params.quizId;
        if (!quizId) {
            return Utils.requiredRequestParamNotFound(res, "quiz", {
                quiz: {
                    param: quizId,
                },
            });
        }
        await QuizService.deleteQuiz(quizId);
        return res.status(200).json({
            message: "Quiz deleted Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while deleting the quiz",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description List all quizzes by the specific course
 * @params req, res
 * @return QuizList
 */
router.get("/:id/quiz/list", async (req, res) => {
    try {
        const course = req.params.id;
        if (!course) {
            return Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const quizzes = await QuizService.getAllQuizzes(course);
        return res.status(200).json({
            message: "Quizes retrieved Successfully",
            success: true,
            data: quizzes,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the quizzes.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Get a quiz by quizId
 * @params req, res
 * @return Quiz
 */
router.get("/:id/quiz/:quizId", async (req, res) => {
    try {
        const quizId = req.params.quizId;
        if (!quizId) {
            return Utils.requiredRequestParamNotFound(res, "quiz", {
                quiz: {
                    param: quizId,
                },
            });
        }
        const quiz = await QuizService.getQuiz(quizId);
        return res.status(200).json({
            message: "Quizes retrieved Successfully",
            success: true,
            data: quiz,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the quizzes.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Attempt a quiz by student
 * @params req, res
 * @return Score
 */
router.put("/:id/quiz/:quizId/attempt", async (req, res) => {
    try {
        const attempt = req.body.attempt;
        if (!attempt) {
            return Utils.requiredRequestBodyNotFound(res, "attempt", {
                attempt: {},
            });
        }
        attempt.quiz = req.params.quizId;
        const score = await QuizService.attemptQuiz(attempt);

        return res.status(200).json({
            message: "Quizes attempted Successfully",
            success: true,
            data: score,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while attempting the quiz.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description List Quiz for student
 * @params req, res
 * @return QuizList
 */
router.get("/:id/quiz/list/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const course = req.params.id;
        if (!studentId) {
            return Utils.requiredRequestParamNotFound(res, "studentId", {
                studentId: {
                    param: studentId,
                },
            });
        }

        const quizzes = await QuizService.studentQuizzes(course, studentId);

        return res.status(200).json({
            message: "Quizes retrieved Successfully",
            success: true,
            data: quizzes,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while attempting the quiz.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Get a signed url for the assignment attachment
 * @params req, res
 * @return SignedUrl
 */
router.get("/:id/assignment/attachment/upload", async (req, res) => {
    try {
        const url = await AssignmentService.generateSignedUrlUpload();

        return res.status(200).json({
            message: "Upload URL retrieved Successfully",
            success: true,
            data: url,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while generating the upload url.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Create a new assignment for the specific course
 * @params req, res
 * @return status
 */
router.put("/:id/assignment/new", async (req, res) => {
    try {
        const assignment = req.body.assignment;
        if (!assignment) {
            return Utils.requiredRequestBodyNotFound(res, "assignment", {
                assignment: {},
            });
        }
        assignment.course = req.params.id;
        await AssignmentService.createAssignment(assignment);
        return res.status(200).json({
            message: "Assignment created Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while create a new assignment.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Delete an existing assignment by assignmentId
 * @params req, res
 * @return status
 */
router.delete("/:id/assignment/:assignmentId", async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        if (!assignmentId) {
            return Utils.requiredRequestParamNotFound(res, "assignment", {
                assignment: {
                    param: "assignmentId",
                },
            });
        }
        await AssignmentService.deleteAssignment(assignmentId);
        return res.status(200).json({
            message: "Assignment deleted Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while deleting the assignment.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description List all assignments for the specific course
 * @params req, res
 * @return AssignmentList
 */
router.get("/:id/assignment/list", async (req, res) => {
    try {
        const course = req.params.id;
        if (!course) {
            return Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }
        const assignments = await AssignmentService.getAssignments(course);
        return res.status(200).json({
            message: "Assignments retrieved Successfully",
            success: true,
            data: assignments,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the assignments.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Submit assignment by student
 * @params req, res
 * @return Status
 */
router.put("/:id/assignment/:assignmentId/attempt", async (req, res) => {
    try {
        const attempt = req.body.attempt;
        if (!attempt) {
            return Utils.requiredRequestParamNotFound(res, "attempt", {
                attempt: {
                    attempt: {},
                },
            });
        }

        attempt.assignment = req.params.assignmentId;
        await AssignmentService.attemptAssignment(attempt);

        return res.status(200).json({
            message: "Assignments submitted Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while submitting the assignment.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description List assignment submissions for the specific assignment
 * @params req, res
 * @return AssignmentSubmissionList
 */
router.get("/:id/assignment/:assignmentId/attempts", async (req, res) => {
    try {
        const submissions = await AssignmentService.getAttempts(req.params.assignmentId);

        return res.status(200).json({
            message: "Assignment submissions retrieved Successfully",
            success: true,
            data: submissions,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the assignment submissions.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Submit assignment feedback
 * @params req, res
 * @return AssignmentSubmissionList
 */
router.post("/:id/assignment/:assignmentId/feedback", async (req, res) => {
    try {
        const feedback = req.body.feedback;
        if (!feedback) {
            return Utils.requiredRequestParamNotFound(res, "feedback", {
                feedback: {
                    feedback: {},
                },
            });
        }
        await AssignmentService.submitFeedback(req.body.attemptId, feedback);

        return res.status(200).json({
            message: "Assignment feedback submitted Successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while submitting the assignment feedback.",
            success: false,
        });
    }
});

/**
 * @author Parth Shah
 * @description Assignment list for student
 * @params req, res
 * @return AssignmentSubmissionList
 */
router.get("/:id/assignment/list/:studentId", async (req, res) => {
    try {
        const assignments = await AssignmentService.getStudentAttempts(req.params.id, req.params.studentId);

        return res.status(200).json({
            message: "Assignment submissions retrieved Successfully",
            success: true,
            data: assignments,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the assignment submissions.",
            success: false,
        });
    }
});

/**
 * @author Parampal Singh
 * @description Leaderboard for a course
 * @params req, res
 * @return Leaderboard
 */
router.get("/:id/leaderboard", async (req, res) => {
    try {
        const course = req.params.id;
        if (!course) {
            return Utils.requiredRequestParamNotFound(res, "course", {
                course: {
                    param: id,
                },
            });
        }

        const leaderboard = await QuizService.studentsQuizLeaderboard(course);

        return res.status(200).json({
            message: "Leaderboard retrieved Successfully",
            success: true,
            data: leaderboard,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Something went wrong while getting the leaderboard.",
            success: false,
        });
    }

})

module.exports = router;
