const Student = require("../models/student");
const Course = require("../../courses/models/course");
const Tutor = require("../../tutors/models/tutor");

const checkIfCourseExistsAndUpdate = (student, courseId, archived) => {
    for (let i = 0; i < student.courses.length; i++) {
        const currCourse = student.courses[i];
        if (currCourse.course.valueOf() === courseId) {
            currCourse.archived = archived;
            return student;
        } else if ((currCourse.course.valueOf() !== courseId) && (i === student.courses.length - 1) && archived) {
            student.courses.push({
                course: courseId,
                progress: 0,
                archived: archived
            })
            return student;
        }
    };
    return student;
}

const checkIfCourseExistsAndUnEnroll = (oldStudent, oldCourse) => {
    oldStudent.courses = (oldStudent.courses).filter(c_ => c_.course?.valueOf() !== oldCourse?._id?.valueOf())
    oldCourse.students = (oldCourse.students).filter(s_ => s_._id?.valueOf() !== oldStudent?._id?.valueOf())
    return { oldStudent: oldStudent, oldCourse: oldCourse }
}

const checkIfCourseExistsAndEnroll = (oldStudent, oldCourse) => {
    if ((oldStudent.courses).find(c_ => c_.course?.valueOf() === oldCourse?._id.valueOf())) {
        return { oldStudent: oldStudent, oldCourse: oldCourse }
    }
    oldStudent.courses = [...(oldStudent.courses), {course:oldCourse._id, progress:0, archived:false}]
    oldCourse.students = [...(oldCourse.students), oldStudent._id]


    return { oldStudent: oldStudent, oldCourse: oldCourse }
}

const courseProgressHandler = async (student, courseId, type, courseProgress) => {
    for (let i = 0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if (course._id === courseId) {
            if (type === "get") {
                return course.progress;
            } else if (type === "set") {
                course.progress = courseProgress;
                await student.save();
                return course.progress;
            }
        } else if ((course._id !== courseId) && (i === student.courseslength - 1)) {
            return false;
        }
    }
}

const getAllCoursesTypeHandler = (student, type) => {
    const archivedCourses = [];
    const enrolledCourses = [];
    for (let i = 0; i < student.courses.length; i++) {
        const course = student.courses[i];
        if (course.archived === true) {
            archivedCourses.push(course);
        } else {
            enrolledCourses.push(course);
        }
    }
    return type === "archived" ? archivedCourses : enrolledCourses;
}

const archiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, true);
    return await newStudent.save();
}

const unArchiveCourse = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    const newStudent = checkIfCourseExistsAndUpdate(student, courseId, false);
    return await newStudent.save();
}

const getCourseProgress = async (studentId, courseId) => {
    const student = await Student.findById({ _id: studentId });
    return await courseProgressHandler(student, courseId, "get", null);
}

const setCourseProgress = async (studentId, courseId, courseProgress) => {
    const student = await Student.findById({ _id: studentId });
    return await courseProgressHandler(student, courseId, "set", courseProgress);
}

const getAllEnrolledCourses = async (studentId) => {
    const student = await Student.findById({ _id: studentId }).populate({
        path: 'courses',
        populate: {
            path: 'course',
            model: 'Course',
            populate: {
                path: 'tutor',
                model: 'Tutor'
            }
        }
    });
    return getAllCoursesTypeHandler(student, "enrolled");
}

const getAllArchivedCourses = async (studentId) => {
    const student = await Student.findById({ _id: studentId }).populate({
        path: 'courses',
        populate: {
            path: 'course',
            model: 'Course',
            populate: {
                path: 'tutor',
                model: 'Tutor'
            }
        }
    });
    return getAllCoursesTypeHandler(student, "archived");
}

const enrollInACourse = async (studentId, courseId) => {
    const oldStudent = await Student.findById({ _id: studentId });
    const oldCourse = await Course.findById({ _id: courseId });
    const { oldStudent: newStudent, oldCourse: newCourse } = checkIfCourseExistsAndEnroll(oldStudent, oldCourse);
    return (await newStudent.save()) && (await newCourse.save());
}

const unenrollFromACourse = async (studentId, courseId) => {
    const oldStudent = await Student.findById({ _id: studentId });
    const oldCourse = await Course.findById({ _id: courseId });
    console.log("COURSEEEE",oldCourse)
    console.log("COURSEEEE--IDDD",courseId)
    const { oldStudent: newStudent, oldCourse: newCourse } = checkIfCourseExistsAndUnEnroll(oldStudent, oldCourse);
    return (await newStudent.save()) && (await newCourse.save());
}

const getCourseRecommendations = async (studentId) => {
    const courses = await Course.find({}).populate('tutor');
    return courses;
}

const getTutorRecommendations = async (studentId) => {
    const tutors = await Tutor.find({});
    return tutors;
}

module.exports = {
    archiveCourse,
    unArchiveCourse,
    getCourseProgress,
    setCourseProgress,
    getAllEnrolledCourses,
    getAllArchivedCourses,
    enrollInACourse,
    unenrollFromACourse,
    getTutorRecommendations,
    getCourseRecommendations
}
