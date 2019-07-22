const Joi = require("joi");

function validate(data, schema) {
    const { error } = Joi.validate(data, schema);
    return error;
}

function validationHandler(schema, check = "body") {
    return function(req, res, next) {
        const error = validate(req[check], schema);
        error ? next(res.status(403).send('Datos inválidos: ' + error)) : next();
    };
}

module.exports = validationHandler;