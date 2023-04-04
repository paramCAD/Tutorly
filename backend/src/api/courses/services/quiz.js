/*
    Author: Parth Shah
*/

const db = require("../../userManagement/models/user");

const Quiz = require("../models/quiz");
const QuizAttempt = require("../models/quizAttempt");

// method to create a new quiz
const createQuiz = async (quiz) => {
    const newQuiz = new Quiz(quiz);
    await newQuiz.save();
};

// method to delete a quiz
const deleteQuiz = async (quizId) => {
    await Quiz.findByIdAndDelete(quizId);
};

// method to get quizzes for a course
const getAllQuizzes = async (course) => {
    const quizzes = await Quiz.find({ course });
    return quizzes;
};

// method to get a quiz by id
const getQuiz = async (quizId) => {
    const quiz = await Quiz.findById(quizId);
    return quiz;
};

// method to update a quiz attempt
const attemptQuiz = async (attempt) => {
    // prevent multiple attempts by the same student
    const existingAttempt = await QuizAttempt.findOne({
        quiz: attempt.quiz,
        student: attempt.student,
    });
    if (existingAttempt) {
        throw new Error("You have already attempted this quiz");
    }

    const quiz = await Quiz.findById(attempt.quiz);
    let correctAnswerCount = 0;

    for (let i = 0; i < quiz.questions.length; i++) {
        const options = quiz.questions[i].options;
        const attemptedAnswer = attempt.answers[i].option;
        const currentAsnswer = options.find((option) => option.option === attemptedAnswer);

        if (currentAsnswer.isCorrect) {
            correctAnswerCount++;
        }
    }

    attempt.score = (correctAnswerCount / quiz.questions.length) * 100;

    const newAttempt = new QuizAttempt(attempt);
    await newAttempt.save();
    return { score: attempt.score };
};

// method to get quiz attempts for a quiz
const studentQuizzes = async (course, student) => {
    const quizzes = await Quiz.find({ course }).lean();

    for (let i = 0; i < quizzes.length; i++) {
        const quiz = quizzes[i];
        console.log(quiz);
        const attempt = await QuizAttempt.findOne({
            quiz: quiz._id,
            student,
        });
        if (attempt) {
            quizzes[i].score = attempt.score;
        }
    }

    return quizzes;
};

// method to get leaderboard (Author: Parampal Singh)
const studentsQuizLeaderboard = async (course) => {

    const quizzes = await getAllQuizzes(course);

    var studentlist = [];

    if (quizzes) {
        for (let i = 0; i < quizzes.length; i++) {
            const quiz = quizzes[i];
            const id = quiz._id;
            const allAttempts = await QuizAttempt.find({
                quiz: quiz._id
            });

            if (allAttempts) {
                for (let j = 0; j < allAttempts.length; j++) {
                    attempt = allAttempts[j];

                    var studentDetails = await db
                        .findById(
                            attempt.student.toString()
                        ).exec();                    

                    if (studentlist.length > 0) {
                        console.log(attempt.student.toString())
                        var student = studentlist.find(e => e.id.toString() == attempt.student.toString())

                        if (student) {
                            var obj = studentlist.find(e => e.id.toString() == attempt.student.toString());
                            obj.score = obj.score + attempt.score;
                        }
                        else {
                            var studentObj = {};
                            studentObj['id'] = attempt.student;
                            studentObj['score'] = attempt.score;
                            studentObj['name'] = studentDetails.firstname + " " + studentDetails.lastname;
                            studentlist.push(studentObj)
                        }
                    }
                    else {
                        var studentObj = {};
                        studentObj['id'] = attempt.student;
                        studentObj['score'] = attempt.score;
                        studentObj['name'] = studentDetails.firstname + " " + studentDetails.lastname;
                        studentlist.push(studentObj)
                    }
                }
            }
        }

        return studentlist;
    }




};

module.exports = {
    createQuiz,
    deleteQuiz,
    getAllQuizzes,
    getQuiz,
    attemptQuiz,
    studentQuizzes,
    studentsQuizLeaderboard
};
