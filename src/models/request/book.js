const Joi = require('@hapi/joi')
const { query } = require('express')

module.exports = {
    // createBook
    0: {
        body: {
            title: Joi.string().required(),
            link: Joi.string().required(),
            description: Joi.string().required(),
            author: Joi.number().required(),
            page: Joi.number().required(),
            pub_date:Joi.date().required()
        },
        model: "createBook", // Name of the model
        group: "Book", // Swagger tag for apis.
        description: "Create book and save details in database"
    },
    1: {
        query:{
            limit:Joi.number().required(),
            page:Joi.number().required()
        },
        model: "Get Book", // Name of the model
        group: "Book", // Swagger tag for apis.
        description: "Get book from database"
    },
    2: {
        
        model: "Get Book by ID", // Name of the model
        group: "Book", // Swagger tag for apis.
        description: "Get book by ID from database"
    },
    3: {
        
        model: "Delete Book by ID", // Name of the model
        group: "Book", // Swagger tag for apis.
        description: "Delete book by ID from database"
    },
    4: {
        path:{
            id:Joi.string().required()
        },
        body: {
            title: Joi.string().required(),
            link: Joi.string().required(),
            description: Joi.string().required(),
            author: Joi.number().required(),
            page: Joi.number().required(),
            pub_date:Joi.date().required()
        },
        model: "Update Book", // Name of the model
        group: "Book", // Swagger tag for apis.
        description: "Update book and save details in database"
    },
}