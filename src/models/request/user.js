const Joi = require('@hapi/joi')
const { query } = require('express')

module.exports = {
    // create User
    // 0: {
    //     body: {
    //         firstname: Joi.string().required(),
    //         lastname: Joi.number().required(),
    //         email: Joi.string().required(),
    //         password: Joi.string().required(),
    //         confirmPassword: Joi.string().required(),
    //     },
    //     model: "Create user", // Name of the model
    //     group: "User", // Swagger tag for apis.
    //     description: "Create user and save details in database"
    // },
    0: {

        model: "Get Users", // Name of the model
        group: "User", // Swagger tag for apis.
        description: "Get user from database"
    },
    1: {
        
        model: "Get user", // Name of the model
        group: "User", // Swagger tag for apis.
        description: "Get course by ID from database"
    },
    2: {
        path:{
            id:Joi.string().required()
        },
        model: "Delete User by ID", // Name of the model
        group: "User", // Swagger tag for apis.
        description: "Delete User by ID from database"
    },
    3: {
        path:{
            id:Joi.string().required()
        },
        body: {
            firstname: Joi.string().required(),
            lastname: Joi.number().required(),
            email: Joi.string().required(),
        },
        model: "Update User", // Name of the model
        group: "User", // Swagger tag for apis.
        description: "Update user and save details in database"
    },
}