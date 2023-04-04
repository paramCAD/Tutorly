const Service = require("../services/services");
const Upload = require("../models/Upload");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");


// const app = express();
// app.use(express.urlencoded({extended: true}));

/**
 * @author Dhairya Shah
 * @description Get all content from the database
 * @params req, res
 * @return content
 */
router.get("/all/content", async (req, res) => {
    try {
        const upload = await Service.getUpload();
        console.log("Uploaded Content:", upload);
        return res.status(200).json({
            message: "Fetched all content",
            success: true,
            data: upload,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve uploaded content.",
            success: false,
        });
    }
});

/**
 * @author Dhairya Shah
 * @description Create a new content
 * @params req, res
 * @return content
 */
 router.put("/add", async (req, res) => {
    try {
        const upload = req.body.contentUpload;
        console.log("Uploaded Content: ", upload);
        if(!upload){
            Utils.requiredRequestBodyNotFound(res, "upload", {upload: {
                param: Object.keys(Upload.toObject())
            }});
        }
        const newUpload = await Service.createContent(upload);
        console.log("newUpload: ", newUpload);
        return res.status(200).json({
            message: "Uploaded new content",
            success: true,
            data: newUpload,
        });
    } catch (err) {
        console.log("ERRRRRRORRRRRRR:",err);
        return res.status(500).json({
            message: "Internal server error. Unable to upload the content.",
            success: false,
        });
    }
});

/**
 * @author Dhairya Shah
 * @description Get a specific content by course id
 * @params req, res
 * @return content
 */
 router.get("/content/:id", async (req, res) => {
    try {
        const course_id = req.params.id;
        console.log("Course Id: ", course_id);
        if(!course_id){
            Utils.requiredRequestBodyNotFound(res, "upload", {upload: {
                param: id
            }});
        }
        const content = await Service.getSpecificContentbuCourseId(course_id);
        console.log("Content: ", content);
        return res.status(200).json({
            message: "Obtained the specific course content",
            success: true,
            data: content,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the course content.",
            success: false,
        });
    }
});

module.exports = router;