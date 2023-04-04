/*
    Author: Parth Shah
*/

const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const Assignment = require("../models/assignment");
const AssignmentAttempt = require("../models/assignmentAttempt");
const User = require("../../userManagement/models/user");

// method to get the signed url for the assignment attachment
const generateSignedUrlUpload = async () => {
    const id = uuidv4();
    const storage = new Storage();

    const bucket = storage.bucket("tutorly-assignment-attachments");
    const file = bucket.file(`${id}.pdf`);

    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 1000 * 60 * 60, // one hour
        contentType: "application/octet-stream",
    };

    const [url] = await file.getSignedUrl(options);

    return { url, id };
};

// method to create a new assignment
const createAssignment = async (assignment) => {
    const newAssignment = new Assignment(assignment);
    await newAssignment.save();
};

// method to delete an assignment
const deleteAssignment = async (assignmentId) => {
    await Assignment.findByIdAndDelete(assignmentId);
};

// method to get assignments for a course
const getAssignments = async (course) => {
    const assignments = await Assignment.find({ course }).lean();
    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < assignments.length; i++) {
        assignments[i].attachmentUrls = [];
        for (let j = 0; j < assignments[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${assignments[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            assignments[i].attachmentUrls.push(url);
        }
    }

    return assignments;
};

// method to upload an assignment attempt
const attemptAssignment = async (attempt) => {
    // prevent multiple attempts by the same student
    const existingAttempt = await AssignmentAttempt.findOne({
        assignment: attempt.assignment,
        student: attempt.student,
    });

    if (existingAttempt) {
        throw new Error("You have already attempted this assignment");
    }

    const newAttempt = new AssignmentAttempt(attempt);
    await newAttempt.save();
};

// metohd to get the attempts for a student
const getAttempts = async (assignmentId) => {
    const attempts = await AssignmentAttempt.find({ assignment: assignmentId }).lean();
    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < attempts.length; i++) {
        attempts[i].attachmentUrls = [];
        for (let j = 0; j < attempts[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${attempts[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            attempts[i].attachmentUrls.push(url);
        }
        const user = await User.findById(attempts[0].student);
        if (user) {
            if (user.firstname && user.lastname) {
                attempts[i].studentName = `${user.firstname} ${user.lastname}`;
            }
        }
    }

    return attempts;
};

// method to get the feedback for a student
const submitFeedback = async (attemptId, feedback) => {
    const attempt = await AssignmentAttempt.findById(attemptId);
    if (!attempt) {
        throw new Error("Attempt not found");
    }
    attempt.feedback = feedback;
    await attempt.save();
};

// method to get attempts for a student
const getStudentAttempts = async (courseId, studentId) => {
    const assignments = await Assignment.find({ course: courseId }).lean();

    const storage = new Storage();
    const bucket = storage.bucket("tutorly-assignment-attachments");

    for (let i = 0; i < assignments.length; i++) {
        assignments[i].attachmentUrls = [];
        for (let j = 0; j < assignments[i].attachments.length; j++) {
            // generate signed url for each attachment
            const file = bucket.file(`${assignments[i].attachments[j]}.pdf`);
            const options = {
                version: "v4",
                action: "read",
                expires: Date.now() + 1000 * 60 * 60, // one hour
            };
            const [url] = await file.getSignedUrl(options);
            assignments[i].attachmentUrls.push(url);
        }

        const findAttempt = await AssignmentAttempt.findOne({
            assignment: assignments[i]._id,
            student: studentId,
        });

        if (findAttempt) {
            assignments[i].feedback = findAttempt.feedback;
        }
    }

    return assignments;
};

module.exports = {
    generateSignedUrlUpload,
    createAssignment,
    deleteAssignment,
    getAssignments,
    attemptAssignment,
    getAttempts,
    submitFeedback,
    getStudentAttempts,
};
