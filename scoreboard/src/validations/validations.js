const Joi = require('joi');

module.exports = {
    UpdateScore: {
        body: {
            matchId: Joi.string().required(),
            battingTeamId: Joi.string().required(),
            batsmanId: Joi.string().required(),
            runnerId: Joi.string().required(),
            overNumber: Joi.number().required(),
            ballNumber: Joi.number().required(),
            run: Joi.number().required(),
            isExtra: Joi.boolean().required(),
            isWicket: Joi.boolean().required(),
        },
        query: {},
        param: {},
    },
/*    // POST /v1/cabs/onboard_cab
    onBoardCab: {
        body: {
            userId: Joi.string().optional(),
            cabNumber: Joi.string().required(),
            isActive: Joi.number().required(),
            isAvailable: Joi.number().required(),
            isPink: Joi.number().required(),
            loc: Joi.string().required()
        },
        query: {},
        param: {},
    },

    // GET /v1/cabs/fetch_cabs
    fetchCabs: {
        body: {},
        query: {
            lat: Joi.string().required(),
            long: Joi.string().required(),
            isPink: Joi.number().optional()
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
    },*/
};