const Joi = require('joi');

module.exports = {
    // POST /v1/api/CreateParking
    createParking: {
        body: [{
            floorNumber: Joi.string().required(),
            slotNumber: Joi.string().required(),
            vehicleType: Joi.number().required(),
        }],
        query: {},
        param: {},
    },

    // GET /v1/cabs/fetch_cabs
    FindEmptySlot: {
        body: {},
        query: {
            vehicleType: Joi.string().required(),
            floorNumber: Joi.string().optional(),
        },
        param: {},
    },

    // POST /v1/cabs/allocate_cab
    allocateCab: {
        body: {
            userId: Joi.string().optional(),
            cabId: Joi.string().required(),
            source: Joi.string().required(),
            destination: Joi.string().required(),
        },
        query: {},
        param: {},
    },

    // POST /v1/cabs/deport_cab
    deportCab: {
        body: {
            rideId: Joi.string().required()
        },
        query: {},
        param: {},
    },
};