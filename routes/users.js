const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserService = require("../services/users");
const validation = require("../utils/middlewares/validationHandler");

const { config } = require("../config");

const {
    userIdSchema,
    createUserSchema,
    updateUserSchema
} = require("../utils/schemas/users");

// Basic strategy
require("../utils/auth/strategies/basic");

const userService = new UserService();

router.post("/", validation(createUserSchema), async function (req, res, next) {
    const {body: user} = req;

    if (await userService.hasEmailUser(user.email)) {
        res.status(403).json({
            error: 403,
            message: "La cuenta con ese correo electrónico ya existe"
        });
        return;
    }

    try {
        const createdUser = await userService.createUser({user});

        res.status(200).json({
            data: createdUser,
            message: "Usuario registrado correctamente"
        });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async function(req, res, next) {
    passport.authenticate("basic", function(error, user) {
        try {
            if (error || !user) {
                next(res.status(400).json({
                    message: "Credenciales invalidas"
                }));
            }

            req.login(user, { session: false }, async function(error) {
                if (error) {
                    next(error);
                }

                const payload = { sub: user.lastName, email: user.email };
                const token = jwt.sign(payload, config.authJwtSecret, {
                    expiresIn: "15m"
                });

                return res.status(200).json({
                    message: 'Sesión iniciada correctamente',
                    id: user._id,
                    token: token ,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
});

module.exports = router;