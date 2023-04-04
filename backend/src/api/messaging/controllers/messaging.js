/**
 * @author Harsh Shah
 */
const { getMessages, postMessage } = require("../services/messaging");

const router = require("express").Router();

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return messages
 */
router.get("/:id", async (req, res) => {
    const { id: conversationId } = req.params;

    res.json(await getMessages(conversationId));
});

/**
 * @author Harsh Shah
 * @description
 * @params req, res
 * @return message Id
 */
router.post("/", async (req, res) => {
    const { sender_user_id, receiver_user_id, conversation_id, is_important, message } = req.body;

    if (sender_user_id === undefined || receiver_user_id === undefined || conversation_id === undefined || message === undefined) {
        return res.status(400).json({
            message: "Some required fields are missing: [sender_user_id, receiver_user_id, conversation_id, message]",
        });
    }

    const response = await postMessage(sender_user_id, receiver_user_id, conversation_id, is_important, message);

    return res.json(response);
});

module.exports = router;
