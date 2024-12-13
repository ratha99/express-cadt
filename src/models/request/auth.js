const Joi = require('@hapi/joi')
const { query } = require('express')

module.exports = {
   // create User
    0: {
        body: {
            firstname: Joi.string().required(),
            lastname: Joi.number().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        },
        model: "Create user", // Name of the model
        group: "Auth", // Swagger tag for apis.
        description: "Create user and save details in database"
    },
    1: {
        body: {
            email: Joi.string().required().default('example@gmail.com'),
            password: Joi.string().required().default('12345678'),
        },
        model: "Login Users", // Name of the model
        group: "Auth", // Swagger tag for apis.
        description: "User Login"
    },

}