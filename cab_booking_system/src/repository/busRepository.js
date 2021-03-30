const Bus = require("../models/bus");
const Journey = require("../models/journey");
const Seats = require("../models/seat");

exports.CreateBusRecord = async (body) => {
    return Bus.create(body);
}

exports.CreateJourneyRecord = async (body) => {
    return Journey.create(body);
}

exports.GetBusData = async (id) => {
    return Bus.findById(id);
}

exports.CreateSeats = async (body) => {
    return Seats.insertMany(body);
}

exports.getSeatsByJourneyAndBusId = async (journeyId, busId ) => {
    return await Seats.find({journeyId, busId, isBooked: false});
}

exports.checkIfSeatExist = async (journeyId, busId, seatNo) => {
    return await Seats.find({journeyId, busId, seatNo});
}

exports.checkIfSeatBooked = async (seatNo, journeyId, busId) => {
    return await Seats.find({ seatNo, isBooked : true, journeyId, busId });
}

exports.bookSeats = async (seatNo, journeyId, busId, passengerId) => {
    return await Seats.updateOne({journeyId, busId, seatNo}, {$set: {isBooked: true, passengerId}});
}