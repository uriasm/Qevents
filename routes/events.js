const express = require("express");
const passport = require("passport");
const router = express.Router();
const EventService = require("../services/events");
const validation = require("../utils/middlewares/validationHandler");

const {
    eventIdSchema,
    eventLocationSchema,
    createEventSchema,
    updateEventSchema,
    updateAttendanceSchema
} = require("../utils/schemas/events");

// jsonwebtoken
require("../utils/auth/strategies/jwt");


const eventService = new EventService();

router.get("/", passport.authenticate("jwt", {session: false}),
    async function (req, res, next) {
        const query = req.query;
        console.log(query);

        if(!query.page || !query.limit){
            res.status(500).json({
                message: "Error al obtener los eventos"
            });
        }

        try {
            const events = await eventService.getEvents({query});

            res.status(200).json({
                page: query.page,
                items: events,
                message: "Eventos obtenidos correctamente"
            });
        } catch (err) {
            next(err);
        }
    });

router.get("/:eventId",
    passport.authenticate("jwt", {session: false}),
    async function (req, res, next) {
    const {eventId} = req.params;

    try {
        const event = await eventService.getEvent({eventId});

        res.status(200).json({
            data: event,
            message: "event retrieved"
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", validation(createEventSchema),
    passport.authenticate("jwt", {session: false}),
    async function (req, res, next) {
        const {body: event} = req;

        try {
            const createdEvent = await eventService.createEvent({event});

            res.status(200).json({
                message: "Evento registrado correctamente",
                id: createdEvent
            });
        } catch (err) {
            next(err);
        }
    });

router.put("/:eventId",
    passport.authenticate("jwt", {session: false}),
    validation({eventId: eventIdSchema}, "params"),
    validation(updateEventSchema), async function (req, res, next) {
        const {eventId} = req.params;
        const {body: event} = req;
        try {
            const updatedEvent = eventService.updateEvent({eventId, event});
            res.status(200).json({
                data: updatedEvent,
                message: "event updated"
            });
        } catch (err) {
            next(err);
        }
    });

router.delete("/:eventId",
    passport.authenticate("jwt", {session: false}),
    validation({eventId: eventIdSchema}, "params"),
    async function (req, res, next) {
        const {eventId} = req.params;

        try {
            const event = eventService.deleteEvent({eventId});

            res.status(200).json({
                data: event,
                message: "event deleted"
            });
        } catch (err) {
            next(err);
        }
    });

router.post("/attendance/:eventId",
    passport.authenticate("jwt", {session: false}),
    validation({eventId: eventIdSchema}, "params"),
    validation(updateAttendanceSchema), async function (req, res, next) {
        const {eventId} = req.params;
        const {body: event} = req;

        try {
            const updateAttendance = eventService.updateAttendance({eventId, event});
            res.status(200).json({
                data: updateAttendance,
                message: "Asistencia registrada correctamente"
            });
        } catch (err) {
            next(err);
        }
    });

router.delete("/attendance/:eventId",
    passport.authenticate("jwt", {session: false}),
    validation({eventId: eventIdSchema}, "params"),
    validation(updateAttendanceSchema), async function (req, res, next) {
        const {eventId} = req.params;
        const {body: event} = req;

        try {
            const updateAttendance = eventService.updateAttendance({eventId, event});
            res.status(200).json({
                data: updateAttendance,
                message: "Asistencia eliminada correctamente"
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;