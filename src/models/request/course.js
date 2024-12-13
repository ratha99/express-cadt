const Joi = require('@hapi/joi')
const { query } = require('express')

module.exports = {
    // create Course
    0: {
        body: {
            title: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            author: Joi.string().required(),

        },
        model: "Create Course", // Name of the model
        group: "Course", // Swagger tag for apis.
        description: "Create course and save details in database"
    },
    1: {
        query:{
            limit:Joi.number().required(),
            page:Joi.number().required()
        },
        model: "Get Course", // Name of the model
        group: "Course", // Swagger tag for apis.
        description: "Get course from database"
    },
    2: {
        
        model: "Get Course", // Name of the model
        group: "Course", // Swagger tag for apis.
        description: "Get course by ID from database"
    },
    3: {
        path:{
            id:Joi.string().required()
        },
        model: "Delete Course by ID", // Name of the model
        group: "Course", // Swagger tag for apis.
        description: "Delete Course by ID from database"
    },
    4: {
        path:{
            id:Joi.string().required()
        },
        body: {
            title: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            author: Joi.string().required(),
        },
        model: "Update Course", // Name of the model
        group: "Course", // Swagger tag for apis.
        description: "Update course and save details in database"
    },
}