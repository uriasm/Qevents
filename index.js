const express = require('express');
const boom = require("boom");
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/events');
const authApiRouter = require("./routes/auth");
const usersApiRouter = require("./routes/users");

const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require("./utils/middlewares/errorsHandler");

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi")

// app
const app = express();

// middlewares
app.use(bodyParser.json());

// routes
app.use("/events", eventsRouter);
app.use("/auth", authApiRouter);
app.use("/users", usersApiRouter);

// redirect
app.get('/', function (req, res) {
    res.redirect('/events')
});

app.use(function (req, res, next) {
    const {
        output: {statusCode, payload}
    } = boom.notFound();

    res.status(statusCode).json(payload);
});

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(8000, function () {
    console.log(`Listening http://localhost:${server.address().port}`);
});