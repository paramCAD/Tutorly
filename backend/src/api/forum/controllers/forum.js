/**
 * @author Harsh Shah
 */
const { createForum, getForums, createPostOfForum, getPostsOfForum, getPostDetails, createPostResponse, updatePostOfForum, updatePostResponseOfForum } = require("../services/forum");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.post("/", async (req, res) => {
    const { course_id } = req.body;
    if (course_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [course_id]",
        });
    }

    const id = await createForum(course_id);
    res.json({ id });
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.get("/", async (req, res) => {
    const userId = req.query.user_id;
    if (userId === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [user_id]",
        });
    }

    res.json(await getForums(userId));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.get("/posts/:id", async (req, res) => {
    const { id: forum_id } = req.params;
    if (forum_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [forum_id]",
        });
    }

    res.json(await getPostsOfForum(forum_id));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.post("/posts", async (req, res) => {
    const { user_id, forum_id, title, message } = req.body;
    if (user_id === undefined || forum_id === undefined || title === undefined || message === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [user_id, forum_id, title, message)]",
        });
    }

    res.json(await createPostOfForum(user_id, forum_id, title, message));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.get("/post/details/:id", async (req, res) => {
    const { id: post_id } = req.params;
    if (post_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [post_id]",
        });
    }

    res.json(await getPostDetails(post_id));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.post("/post/response", async (req, res) => {
    const { user_id, post_id, title, message } = req.body;

    console.log(user_id, post_id, title, message);
    if (post_id === undefined || user_id === undefined || title === undefined || message === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [user_id, post_id, title, message]",
        });
    }

    res.json(await createPostResponse(user_id, post_id, title, message));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
router.put("/posts", async (req, res) => {
    const { post_id, title, message } = req.body;
    if (post_id === undefined || title === undefined || message === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [post_id, title, message]",
        });
    }

    res.json(await updatePostOfForum(post_id, title, message));
});


/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return forum
 */
 router.put("/post/response", async (req, res) => {
    const { post_id, post_response_id, status } = req.body;
    if (post_id === undefined || post_response_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [post_id, post_response_id ]",
        });
    }

    res.json(await updatePostResponseOfForum(post_id, post_response_id, status));
});


module.exports = router;
