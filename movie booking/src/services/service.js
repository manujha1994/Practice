const User = require("../models/user");
const Hall = require("../models/movieHall");
const Seats = require("../models/seats");
const Show = require("../models/show");
const Ticket = require("../models/ticket");

exports.CreateUser = async (body) => {
    try {
        return await User.insertMany(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.CreateHall = async (body) => {
    try {
        return await Hall.create(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.CreateShow = async (body) => {
    try {
        return await Show.create(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.CreateSeats = async (body) => {
    try {
        return await Seats.insertMany(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.BookSeat = async (body) => {
    try {
        const isExisting =await checkIfSeatExist(body);
        if(isExisting && isExisting.length > 0) {
            throw new Error (`The following seats does not exist ${JSON.stringify(isExisting)}`);
        }
        const isBooked = await checkIfBooked(body);
        if(isBooked && isBooked.length > 0) {
            throw new Error (`The following seats are already booked ${JSON.stringify(isBooked)}`);
        }
        return await Ticket.insertMany(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.getOccupiedSeat = async (body) => {
    try {
        return await getOccupiedSeat(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

exports.getEmptySeats = async (body) => {
    try {
        return await getEmptySeats(body);
    } catch (err) {
        throw new Error (err.message);
    }
};

const getEmptySeats = async (body) => {
    try {
        const getAllSeatsInfo = await Seats.find({hallId: body.hallId});
        const getBookedSeats = await getOccupiedSeat(body);
        return await getUnoccupiedSeats(getAllSeatsInfo, getBookedSeats);
    } catch (err) {
        throw new Error (err.message);
    }
};

const getOccupiedSeat = async (body) => {
    try {
        const {hallId, showId} = body;
        return await Ticket.find({hallId, showId, status: "booked"});
    } catch (err) {
        throw new Error (err.message);
    }
};

const getUnoccupiedSeats = async (allSeats, BookedSeats) => {
    try {
        let isEmpty = true;
        let availableSeats = [];
        for( let val of allSeats) {
            for(let emptySeat of BookedSeats) {
                if(emptySeat.rowNumber == val.rowNumber && emptySeat.seatNumber == val.seatNumber) {
                    isEmpty = false;
                }
            }
            if(isEmpty) {
                availableSeats.push({val});
            }
            isEmpty = true;
        }
        return availableSeats;
    } catch (err) {
        throw new Error (err.message);
    }
};

const checkIfBooked = async (demandedSeats) => {
    try {
        const checkingParam = {
            "hallId" : demandedSeats[0].hallId,
            "showId" : demandedSeats[0].showId
        }
        const emptySeats = await getOccupiedSeat(checkingParam);
        let isEmpty = true;
        let bookedSeatList = [];
        for(let val of emptySeats) {
            for(let seat of demandedSeats) {
                if(seat.rowNumber == val.rowNumber && seat.seatNumber == val.seatNumber) {
                    isEmpty = false;
                }
            }
            if(!isEmpty) {
                bookedSeatList.push({val});
            }
            isEmpty = true;
        }
        return bookedSeatList;
    } catch (err) {
        throw new Error (err.message);
    }
};

const checkIfSeatExist = async (demandedSeats) => {
    try {
        const hallId = demandedSeats[0].hallId;
        const getAllSeatsInfo = await Seats.find({hallId});
        let exists = false;
        let nonExistantList = [];
            for(let seat of demandedSeats) {
                for(let val of getAllSeatsInfo) {
                    if(seat.rowNumber == val.rowNumber && seat.seatNumber == val.seatNumber) {
                    exists = true;
                }
            }
            if(!exists) {
                nonExistantList.push({seat});
            }
            exists = false;
        }
        return nonExistantList;
    } catch (err) {
        throw new Error (err.message);
    }
}