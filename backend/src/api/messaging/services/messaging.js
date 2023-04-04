/**
 * @author Harsh Shah
 */
const { isValidObjectId } = require("mongoose");
const { ObjectId } = require("../../../db");
const Messages = require("../schema/messages");

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const postMessage = async (sender_user_id, receiver_user_id, conversation_id, is_important, message) => {
    const response = (await new Messages({
        sender_user_id,
        receiver_user_id,
        conversation_id,
        is_important,
        message,
    }).save()).toJSON();

    response["id"] = response._id.toString();
    response["timestamp"] = new Date(response.audit.created_on).toISOString();

    delete response._id;
    delete response.audit;

    return response;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getMessages = async (conversation_id) => {
    if (!isValidObjectId(conversation_id)) {
        return [];
    }

    return (
        await Messages.find({
            conversation_id: ObjectId(conversation_id),
        })
            .sort({ "audit.created_on": 1 })
            .lean()
    ).map((x) => {
        x["id"] = x._id.toString();
        x["timestamp"] = new Date(x.audit.created_on).toISOString();

        delete x._id;
        delete x.audit;
        return x;
    });
};

module.exports = { postMessage, getMessages };
