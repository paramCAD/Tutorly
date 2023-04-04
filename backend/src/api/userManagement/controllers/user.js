/*
    Author: Manasvi(mn838732@dal.ca)
*/

const router = require("express").Router();
const verifySignUp = require("../middlewear/verifySignup");
const services = require("../services/user")

/**
 * @author Manasvi
 * @description Create User
 * @params req, res
 */
router.post("/signup", async (req, res) => {
    try {
        const verify = await verifySignUp.checkDuplicateEmail(req, res)
        if (verify.length > 0) {
            return res.status(500).json({
                message: "Failed! Email is already in use!",
                success: false,
            });
        } else {
            const users = await services.signup(req, res);

            return res.status(200).json({
                message: "User Registered Successfully! Please verify your email and then login",
                success: true,
            });

        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Verify Email
 * @params req, res
 */
router.post("/verifyEmail", async (req, res) => {
    try {
        const users = await services.verifyEmail(req, res);
        if (users === 0) {
            return res.status(200).json({
                message: "Please enter correct verification code",
                success: false,
            });
        } else {
            return res.status(200).json({
                message: "Email Verified Successfully",
                success: true,
            });
        }


    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Login
 * @params req, res
 */
router.post("/login", async (req, res) => {
    try {
        const users = await services.login(req, res);


    } catch (err) {
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Send reset password OTP
 * @params req, res
 */
router.post("/sendotp", async (req, res) => {
    try {

        await services.sendotp(req, res)


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Reset Password
 * @params req, res
 */
router.put("/resetPassword", async (req, res) => {
    try {

        const users = await services.resetPassword(req, res);

        return res.status(200).json({
            message: "Password changed successfully!",
            success: true,
        });


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Update Profile
 * @params req, res
 */
router.put("/updateProfile/:id", async (req, res) => {
    try {

        const users = await services.updateProfile(req, res);
        return res.status(200).json({
            message: "Profile Updated successfully!",
            success: true,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Logout
 * @params req, res
 */
 router.put("/logout/:id", async (req, res) => {
    try {

        const users = await services.logout(req, res);
        return res.status(200).json({
            message: "User LoggedOut successfully!",
            success: true,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

/**
 * @author Manasvi
 * @description Delete
 * @params req, res
 */
 router.put("/delete/:id", async (req, res) => {
    try {

        const users = await services.delete(req, res);
        return res.status(200).json({
            message: "Account Deleted successfully!",
            success: true,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});


module.exports = router;