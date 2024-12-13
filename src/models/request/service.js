const Joi = require('@hapi/joi')

module.exports = {
    0: {
        body: {
            name: Joi.string().required().default('Software Development'),
            description: Joi.string().required().default('I have a freenlance service'),
            detail: Joi.string().required().default('I have a freenlance service'),
        },
        model: "create Service", // Name of the model
        group: "Service", // Swagger tag for apis.
        description: "Create the Service and save details in database"
    },
    1: {

        model: "get All Service",
        group: 'Service',
        description: 'Get all Service'
    },
    2: {
        path: {
            id: Joi.string().required()
        },
        model: "get Service by ID",
        group: "Service", // Swagger tag for apis.
        description: "Get Service by Id"
    },
    3: {
        path: {
            id: Joi.string().required()
        },
        group: "Service", // Swagger tag for apis.
        description: "Delete Service by Id"
    },
    4: {
        path: {
            id: Joi.string().required()
        },
        body: {
            name: Joi.string().required().optional(),
            description: Joi.string().required().optional(),
            detail: Joi.string().required().optional(),
        },
        model: "update Service", // Name of the model
        group: "Service", // Swagger tag for apis.
        description: "Update Service and save details in database"
    },
 
    
}