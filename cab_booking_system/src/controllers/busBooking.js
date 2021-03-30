const httpStatus = require('http-status');
const busService = require('../services/busService');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong bus service`);
};

exports.createBus = async (req, res, next) => {
    try {
        const data = await busService.CreateBusRecord(req.body)
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.CreateJourneyRecord = async (req, res, next) => {
    try {
        const data = await busService.CreateJourneyRecord(req.body);
        const getBusData = await busService.GetBusData(data.busId);
        const seatsData = {
            journeyId : data["_id"],
            busId : getBusData["_id"],
            numberOfSeats : getBusData.numberOfSeats
        }
        const createSeats = await busService.CreateSeats(seatsData);
        return res.status(httpStatus.OK).json(createSeats);
    } catch (err) {
        next(err);
    }
};

exports.getSeatsByJourneyAndBusId = async (req, res, next) => {
    try {
        const data = await busService.getSeatsByJourneyAndBusId(req.query);
        if(!data) {
            return res.status(httpStatus.OK).json('No seats found');
        }
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.createBusBooking = async (req, res, next) => {
    try {
        const data = await busService.CheckAvailableSeats(req.body);
            return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
