const Event = require("../models/Event");

const getAllEvents = async () => {
    return await Event.find({});
}

const createEvent = async (event) => {
    const event_ = await new Event(event);
    await event_.save();
    return event_;
}

const getSpecificEvent = async (id) => {
    return await Event.find({_id : id});
}

const updateEvent = async (id, event) => {
    const event_ = await Event.updateOne({ _id: id }, 
        { $set: event }, 
        { upsert: true });
    return event_;
}

const deleteEvent = async(id) => {
    return await Event.deleteOne({_id : id});
}


module.exports = {
    getAllEvents,
    createEvent,
    getSpecificEvent,
    updateEvent,
    deleteEvent,
}