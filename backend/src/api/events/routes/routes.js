const Service = require("../services/services");
const Event = require("../models/Event");
const express = require("express");
const router = express.Router();
const Utils = require("../../../utils/utils");

/**
 * @author Arshdeep Singh
 * @description Get all events from the database
 * @params req, res
 * @return events
 */
router.get("/all", async (req, res) => {
    try {
        const events = await Service.getAllEvents();
        console.log("events", events);
        return res.status(200).json({
            message: "Fetched all events",
            success: true,
            data: events,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve events.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Register a new event
 * @params req, res
 * @return events
 */
 router.post("/add", async (req, res) => {
    try {
        const event = req.body.event;
        if(!event){
            return Utils.requiredRequestBodyNotFound(res, "event", {event: {
                param: Object.keys(Event.schema.tree)
            }});
        }
        const newEvent = await Service.createEvent(event);
        return res.status(200).json({
            message: "Added a new event",
            success: true,
            data: newEvent,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to register the event.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Update an existing event
 * @params req, res
 * @return events
 */
 router.put("/update/:id", async (req, res) => {
    try {
        const rawEventId = req.params.id;
        if(!rawEventId){
            return Utils.requiredRequestBodyNotFound(res, "event", {event: {
                param: "id"
            }});
        }
        if(!Utils.isValidObjectId(rawEventId)){
            return Utils.idNotValidBsonObjectId(res, "event", {event: {
                param: "id"
            }});
        }
        const eventId = rawEventId;
        const event = req.body.event;
        if(!event){
            return Utils.requiredRequestBodyNotFound(res, "event", {event: {
                param: Object.keys(Event.schema.tree)
            }});
        }
        const updatedEvent = await Service.updateEvent(eventId, event);
        return res.status(200).json({
            message: "Updated the event",
            success: true,
            data: await Service.getSpecificEvent(eventId),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to update the event.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Get a specific event
 * @params req, res
 * @return event
 */
 router.get("/:id", async (req, res) => {
    try {
        const rawEventId = req.params.id;
        if(!rawEventId){
            return Utils.requiredRequestBodyNotFound(res, "event", {event: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawEventId) === false){
            return Utils.idNotValidBsonObjectId(res, "event", {event: {
                param: "id"
            }});
        }
        const eventId = rawEventId;
        const event = await Service.getSpecificEvent(eventId);
        console.log(event)
        return res.status(200).json({
            message: "Obtained the specific event",
            success: true,
            data: event,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to retrieve the event.",
            success: false,
        });
    }
});

/**
 * @author Arshdeep Singh
 * @description Delete a specific event
 * @params req, res
 * @return events
 */
 router.delete("/delete/:id", async (req, res) => {
    try {
        const rawEventId = req.params.id;
        if(!rawEventId){
            return Utils.requiredRequestBodyNotFound(res, "event", {event: {
                param: "id"
            }});
        }
        if(Utils.isValidObjectId(rawEventId) === false){
            return Utils.idNotValidBsonObjectId(res, "event", {event: {
                param: "id"
            }});
        }
        const eventId = rawEventId;
        const result = await Service.deleteEvent(eventId);
        if(result && result.deletedCount === 0){
            return res.status(200).json({
                message: "No matching records found",
                success: true,
                data: eventId,
            });
        }else{
            return res.status(200).json({
                message: "Deleted the specific event",
                success: true,
                data: eventId,
            });
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error. Unable to delete the event.",
            success: false,
        });
    }
});


module.exports = router;
