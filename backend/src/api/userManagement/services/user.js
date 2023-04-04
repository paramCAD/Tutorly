/*
    Author: Manasvi(mn838732@dal.ca)
*/

const db = require("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var email = require("../middlewear/sendConfirmationEmail");
const Student = require("../../students/models/student");
const Tutor = require("../../tutors/models/tutor");

/**
 * Added Student or Tutor Reference Logic
 * @author Bharatwaaj Shankaranarayanan
 * @description Creates a student/tutor object depending on the role and attaches it to the new user getting created
 */
const createRoleReferenceObject = async (role, firstName, lastName) => {
    switch (role) {
        case "student":
            const student = new Student({
                name: firstName + " " + lastName,
                courses: [],
            });
            return await student.save();
        case "tutor":
            const tutor = new Tutor({
                name: firstName + " " + lastName,
                courses: [],
            });
            return await tutor.save();
        default:
            return false;
    }
};

exports.signup = async (req, res) => {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }

    // Mapping role reference
    const userReference = await createRoleReferenceObject(req.body.roles, req.body.firstName, req.body.lastName);

    console.log("userReference", userReference.id);

    let user_data = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        mode: "offline",
        confirmationCode: code,
        role: req.body.roles,
        resetpasswordOTP: "",
    };

    if (req.body.roles === "student") {
        user_data = {
            ...user_data,
            student: userReference.id,
        };
    } else if (req.body.roles === "tutor") {
        user_data = {
            ...user_data,
            tutor: userReference.id,
        };
    }

    console.log("user_data", user_data);

    let users = new db(user_data);
    users.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        email.sendConfirmationEmail(req.body.firstName, req.body.email, code);
        return user;
    });
};

exports.verifyEmail = async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;
    const emailDB = db.find({ email: email, confirmationCode: code });
    if ((await emailDB).length > 0) {
        await db.updateOne({ email: email }, { $set: { status: "Active" } });
        return 1;
    } else {
        return 0;
    }
};

exports.login = async (req, res) => {
    await db
        .findOne({
            email: req.body.email,
        })
        .populate("student")
        .populate("tutor")
        .exec(async (err, user) => {
            if (err) {
                return;
            }
            if (user.status==="Pending") {
                return res.status(500).json({
                    message: "Please verify your email first",
                    success: false,
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found",
                    success: false,
                });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(500).json({
                    message: "Invalid Password",
                    success: false,
                });
            }
            var token = jwt.sign({ id: user.id, email: user.email }, "secret", {
                expiresIn: "5h",
            });
            await db.updateOne({ email: user.email }, { $set: { mode: "online" } });
            var data = [];
            data.push({ id: user._id, email: user.email, role: user.role, accessToken: token, firstName: user.firstname, lastName: user.lastname, student: user.student, tutor: user?.tutor });
            return res.status(200).json({
                message: "User Login Successfully",
                data: data,
                success: true,
            });
        });
};

exports.sendotp = async (req, res) => {
    const characters = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
        otp += characters[Math.floor(Math.random() * characters.length)];
    }

    db.find({ email: req.body.email }).then(async (data) => {
        if (data.length > 0) {
            await db.updateOne({ email: req.body.email }, { $set: { resetpasswordOTP: otp } });
            email.sendResetEmail(data[0].firstname, req.body.email, otp);
            return res.status(200).json({
                message: "Please check your email for OTP",
                success: true,
            });
        } else {
            return res.status(200).json({
                message: "Invalid Email ID",
                success: false,
            });
        }
    });
};

exports.resetPassword = (req, res) => {
    try {
        db.updateMany({ email: req.body.email, resetpasswordOTP: req.body.otp }, { $set: { password: bcrypt.hashSync(req.body.password, 8) } }).then((data) => {
            return data;
        });
    } catch (e) {
        return e;
    }
};

exports.updateProfile = (req, res) => {
    try {
        if (req.body.password === "") {
            db.updateMany(
                { _id: req.params.id },
                {
                    $set: {
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        email: req.body.email,
                    },
                }
            ).then((data) => {
                return data;
            });
        } else {
            db.updateMany(
                { _id: req.params.id },
                {
                    $set: {
                        firstname: req.body.firstName,
                        lastname: req.body.lastName,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 8),
                    },
                }
            ).then((data) => {
                return data;
            });
        }
    } catch (e) {
        return e;
    }
};

exports.logout = async (req, res) => {
    try {
        await db.updateOne({ _id: req.params.id }, { $set: { mode: "offline" } }).then((data) => {
            return data;
        });
    } catch (e) {
        return e;
    }
};

exports.delete = async (req, res) => {
    try {
        await db.deleteOne({ _id: req.params.id }).then((data) => {
            return data;
        });
    } catch (e) {
        return e;
    }
};
