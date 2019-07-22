const Joi = require("joi");

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
    firstName: Joi.string().max(254).required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    gender: Joi.string().required()
};

const updateUserSchema = {
    firstName: Joi.string().max(254),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    gender: Joi.string()
};

module.exports = {
    userIdSchema: userIdSchema,
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema
};