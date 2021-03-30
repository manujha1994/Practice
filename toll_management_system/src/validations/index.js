const Joi = require('joi');

module.exports = {

    getAllCharges: {
        body: {},
        query: {
            "vehicle_type": Joi.string().required()
        },
        param: {}
    },

    createCharge: {
        body: {
            "journey_type": Joi.string().required(),
            "vehicle_type": Joi.string().required(),
            "charge": Joi.number().required()
        },
        query: {},
        param: {}
    },

    createRide: {
        body: {
            booth_number: Joi.string().required(),
            vehicle_number: Joi.string().required(),
            vehicle_type: Joi.string().required(),
            pass_type: Joi.string().required(),
            amount_charge: Joi.number().required(),
            pass_number: Joi.string().required()
        },
        query: {},
        param: {}
    },

    checkPassValidity: {
        body: {
            vehicle_number: Joi.string().required(),
            pass_number: Joi.string().required(),
            booth_number: Joi.string().required()
        },
        query: {},
        param: {}
    },

    checkBoothSales: {
        body: {
            booth_number: Joi.string().required()
        },
        query: {},
        param: {}
    }
};