/**
 * @author Harsh Shah
 */
const { isValidObjectId, isObjectIdOrHexString } = require("mongoose");
const { ObjectId } = require("../../../db");
const User = require("../../userManagement/models/user");
const Conversation = require("../schema/conversation");
const Messages = require("../schema/messages");

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const createConversation = async (userId1, userId2) => {

    let userOne = ""
    let userTwo = ""

    const user1 = await User.findOne({ _id: ObjectId(userId1)}).lean()
    const user2 = await User.findOne({ _id: ObjectId(userId2)}).lean()



    if(user1 == null){
        const student = await User.findOne({ student: ObjectId(userId1)}).lean();
        if(student == null){
            const tutor = await User.findOne({ tutor: ObjectId(userId1)}).lean();
            userOne = tutor._id.toString()
        } else {
            userOne = student._id.toString()
        }
    } else {
        userOne = user1._id.toString()
    }

    if(user2 == null){
        const student = await User.findOne({ student: ObjectId(userId2)}).lean();

        if(student == null){
            const tutor = await User.findOne({ tutor: ObjectId(userId2)}).lean();
            userTwo  = tutor._id.toString()
        } else {
            userTwo  = student._id.toString()
        }
    } else {
        userTwo = user2._id.toString()
    }

    let exists = await Conversation.findOne({
        users: [userOne, userTwo]
    }).lean()

    if(exists !== null){
        return null
    }

    exists = await Conversation.findOne({
        users: [userTwo, userOne]
    })

    if(exists !== null){
        return null
    }

    console.log(exists)


    const response = await new Conversation({
        users: [userOne, userTwo],
        status: "pending",
    }).save();

    return response._id;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getPendingConversationRequest = async (userId) => {
    if (!isValidObjectId(userId)) {
        return [];
    }

    const user = await User.findOne({
        _id: ObjectId(userId),
    }).lean();

    let status = ["pending"];
    if (user.role === "student") {
        status.push("rejected");
    }

    const conversations = await Conversation.find({
        users: ObjectId(userId),
        status,
    }).populate({ path: "users", model: "User", select: "-password" });

    return conversations.map((convo) => {
        const { users, _id, status } = convo;
        const otherUserIndex = users[0]._id.toString() === userId ? 1 : 0;

        return {
            conversation_id: _id,
            status,
            name: `${users[otherUserIndex].firstname} ${users[otherUserIndex].lastname}`,
            user_id: users[otherUserIndex]._id,
        };
    });
};

const actionOnConversationRequest = async (conversion_id, status) => {
    if (!isValidObjectId(conversion_id)) {
        return [];
    }

    await Conversation.updateOne(
        {
            _id: ObjectId(conversion_id),
        },
        { status }
    );

    return true;
};

/**
 * @author Harsh Shah
 * @description
 * @params userId1, userId2
 * @return conversation Id
 */
const getUserConversations = async (userId) => {
    if (!isValidObjectId(userId)) {
        return [];
    }

    const conversations = await Conversation.find({
        users: ObjectId(userId),
        status: "accepted",
    }).populate({ path: "users", model: "User", select: "-password" });

    const lastMessages = await Messages.find({
        conversion_id: { $in: conversations.map((x) => x._id) },
    })
        .sort({ "audit.created_on": 1 })
        .limit(1);

    const lastMessageMap = lastMessages.reduce((p, c) => {
        return { ...p, [c.conversation_id.toString()]: c };
    }, {});

    return conversations.map((convo) => {
        const { users, _id } = convo;
        const otherUserIndex = users[0]._id.toString() === userId ? 1 : 0;

        return {
            conversation_id: _id,
            name: `${users[otherUserIndex].firstname} ${users[otherUserIndex].lastname}`,
            user_id: users[otherUserIndex]._id,
            last_message: lastMessageMap[_id]?.message,
            last_message_on: lastMessageMap[_id]?.audit.created_on,
        };
    });
};


const deleteConversation = async (conversation_id) => {
    
    console.log(conversation_id)

    if (!isValidObjectId(conversation_id)) {
        return false;
    }

    await Conversation.deleteOne({
            _id: ObjectId(conversation_id),
        });

    return true;
};


module.exports = { createConversation, getUserConversations, 
    getPendingConversationRequest, actionOnConversationRequest, deleteConversation };
