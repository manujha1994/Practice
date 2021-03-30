const User = require("../models/user");
const Flight = require("../models/flight");
const Journey = require("../models/journey");
const Seats = require("../models/seats");

const dayMap = {
    "Monday" : 1,
    "Tuesday" : 2,
    "Wednesday" : 3
}

exports.CreateUser = async (body) => {
    try {
        return await User.create(body);
    } catch (err) {
        throw new Error (err.message)
    }
};
exports.CreateFlight = async (body) => {
    try {
        return await Flight.create(body);
    } catch (err) {
        throw new Error (err.message)
    }
};
exports.CreateJourney = async (body) => {
    try {
        return await Journey.create(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.GetAvailableSeats = async (body) => {
    try {
        const {journeyId, flightId, journeyDate} = body;
        const getBookedSeats = await Seats.find({journeyId, flightId, journeyDate}).populate("flightId");
        console.log(`getBookedSeats ${JSON.stringify(getBookedSeats)}`)
        const getAllSeats = await Flight.find({_id: flightId});
        const SeatsDetails = [];
        const availableSeat = {};
        const FinalSeats = [];
        let isBooked = false;
        for(let val of getAllSeats[0].seatDetails) {
            for(let seat = 1; seat<=val.numberOfSeats; seat++ ) {
                availableSeat.rowId = val.rowNumber;
                availableSeat.seatNumber = seat;
                SeatsDetails.push({...availableSeat})
            }
        }

        for(let val of SeatsDetails) {
            for(let seatData of getBookedSeats) {
                if (val.rowId == seatData.rowId && val.seatNumber == seatData.seatNumber) {
                    isBooked = true;
                    break;
                }
            }
            if(!isBooked) {
                FinalSeats.push(val);
            }
            isBooked = false;
        }
        return FinalSeats;
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.BookASeat = async (body) => {
    try {
        const {journeyId, flightId, journeyDate, rowId, seatNumber, passengerId} = body;
        const availableSeats = await getAvailableSeats(body);
        let isAvailable = false;
        for(let val of availableSeats) {
            if(val.rowId == rowId && val.seatNumber == seatNumber) {
                isAvailable = true;
            }
        }
        if(!isAvailable) {
            throw new Error(`The seat is already occupied`)
        }
        return await Seats.create({journeyId, flightId, journeyDate, rowId, seatNumber, passengerId, status: "occupied"});
    } catch (err) {
        throw new Error(err.message)
    }
}

const getAvailableSeats = async (body) => {
    try {
        const {journeyId, flightId, journeyDate} = body;
        const getBookedSeats = await Seats.find({journeyId, flightId, journeyDate});
        const getAllSeats = await Flight.find({_id: flightId});
        const getJourneyDay = await Journey.find({_id: journeyId});
        const journeyDay = new Date(journeyDate).getDay();
        let isAvailableOnDay = false;
        for(let i of getJourneyDay[0].journeyDays ) {
            if (dayMap[i] == journeyDay) {
                isAvailableOnDay = true;
            }
        }
        if(!isAvailableOnDay) {
            throw new Error (`The flight is not available on this day`)
        }
        const SeatsDetails = [];
        const availableSeat = {};
        const FinalSeats = [];
        let isBooked = false;
        for(let val of getAllSeats[0].seatDetails) {
            for(let seat = 1; seat<=val.numberOfSeats; seat++ ) {
                availableSeat.rowId = val.rowNumber;
                availableSeat.seatNumber = seat;
                SeatsDetails.push({...availableSeat})
            }
        }

        for(let val of SeatsDetails) {
            for(let seatData of getBookedSeats) {
                if (val.rowId == seatData.rowId && val.seatNumber == seatData.seatNumber) {
                    isBooked = true;
                    break;
                }
            }
            if(!isBooked) {
                FinalSeats.push(val);
            }
            isBooked = false;
        }
        return FinalSeats;
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.BookMultipleSeat = async (body) => {
    try {
        const {journeyId, flightId, journeyDate, seats, passengerId} = body;
        const availableSeats = await getAvailableSeats(body);
        let isAvailable = false;
        let bookedSeats = [];
        let bookingArray = [];
        let bookingObject = {
            journeyId, flightId, journeyDate, passengerId, status:"occupied"
        };

        for(let i=0 ;i<seats.length;i++) {
                for(let val of availableSeats) {
                    let row = seats[i].slice(0,1);
                    let column = seats[i].slice(1);
                    console.log(row,column);
                    // if(val.rowId == seats[i][0] && val.seatNumber == seats[i][1]) {
                    if(val.rowId == row && val.seatNumber == column) {
                    isAvailable = true;
                }
            }
                if(!isAvailable) {
                    bookedSeats.push(seats[i]);
                }
                isAvailable = false;
        }
            if(bookedSeats.length > 0) {
                throw new Error(`The following seats are already booked ${bookedSeats}`)
            } else {
                for(let i=0 ;i<seats.length;i++) {
                    let row = seats[i].slice(0,1);
                    let column = seats[i].slice(1)
                    bookingObject.rowId = row[0];
                    bookingObject.seatNumber = column.join('');
                    bookingArray.push({...bookingObject});
                }
            }

        return await Seats.insertMany(bookingArray);
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.GetBookingDetails = async (body) => {
    const {passengerId, journeyDate} = body;
    const where = {
        passengerId
    };
    if (journeyDate) {
        where.journeyDate = journeyDate;
    }
    return Seats.find(where);
}
