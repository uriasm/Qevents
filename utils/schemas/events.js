const Joi = require("joi");

const eventIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const eventLocationSchema = Joi.array().items(Joi.number());

const createEventSchema = {
    title: Joi.string().max(254).required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    image: Joi.string().required(),
    attendances: Joi.number(),
    willYouAttend: Joi.boolean(),
    location: eventLocationSchema
};

const updateEventSchema = {
    title: Joi.string().max(254),
    description: Joi.string(),
    date: Joi.date(),
    image: Joi.string(),
    attendances: Joi.number(),
    willYouAttend: Joi.boolean(),
    location: eventLocationSchema
};

const updateAttendanceSchema = {
    attendances: Joi.number(),
    willYouAttend: Joi.boolean(),
};

module.exports = {
    eventIdSchema: eventIdSchema,
    eventLocationSchema: eventLocationSchema,
    createEventSchema: createEventSchema,
    updateEventSchema: updateEventSchema,
    updateAttendanceSchema: updateAttendanceSchema

};