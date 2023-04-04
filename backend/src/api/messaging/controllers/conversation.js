/**
 * @author Harsh Shah
 */
const Conversation = require("../schema/conversation");
const { createConversation, getUserConversations, getPendingConversationRequest, actionOnConversationRequest, deleteConversation } = require("../services/conversation");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return conversations
 */
router.get("/user/request", async (req, res) => {
    const userId = req.query.user_id;
    if (userId === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [user_id]",
        });
    }

    res.json(await getPendingConversationRequest(userId));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return conversations
 */
router.post("/user/request", async (req, res) => {
    const { conversation_id, status } = req.body;

    if (conversation_id === undefined || status === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [conversation_id, status]",
        });
    }

    const response = await actionOnConversationRequest(conversation_id, status);

    res.json({ status: response });
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return conversations
 */
router.get("/user/:id", async (req, res) => {
    const { id: userId } = req.params;

    if (userId === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [id]",
        });
    }

    res.json(await getUserConversations(userId));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return Conversation ID
 */
router.post("/", async (req, res) => {
    const { userId1, userId2 } = req.body;

    if (userId1 === undefined || userId2 === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [userId1, userId2]",
        });
    }

    const id = await createConversation(userId1, userId2);

    return res.json({ id });
});

router.delete("/", async (req, res) => {
    const { conversation_id } = req.query;

    console.log(conversation_id);

    if (conversation_id === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [conversation_id]",
        });
    }

    const status = await deleteConversation(conversation_id);

    return res.json({ status });
});

module.exports = router;
