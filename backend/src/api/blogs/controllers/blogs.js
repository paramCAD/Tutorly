const router = require("express").Router();
const services = require("../services/blogs")
var multer = require('multer');
  
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


/**
 * @author Manasvi
 * @description Create Blog
 * @params req, res
 */
router.post("/addBlogs",upload.single('image'), async (req, res) => {
    try {
            await services.createBlogs(req, res);

            return res.status(200).json({
                message: "Blogs created successfully!!",
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
 * @description Get Blogs
 * @params req, res
 */
 router.get("/getBlogs",async (req, res) => {
    try {
            const data=await services.getBlogs(req, res);

            return res.status(200).json({
                message: "Blogs fetched successfully!!",
                data:data,
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