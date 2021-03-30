const busRepository = require("../repository/busRepository");

exports.CreateBusRecord = async (body) => {
    try {
        const {numberOfSeats, busName, busNumber} = body;
        const busData = {
            numberOfSeats, busName, busNumber
        }
        return await busRepository.CreateBusRecord(busData);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreateJourneyRecord = async (body) => {
    try {
        const {source, Destination, busId} = body;
        const journeyData = {
            source, Destination, busId
        }
        return await busRepository.CreateJourneyRecord(journeyData);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.GetBusData = async (id) => {
    try {
        return await busRepository.GetBusData(id);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.CreateSeats = async (body) => {
    const {journeyId, busId, numberOfSeats} = body;
    const seatsData = [];
    for(let i=0; i<numberOfSeats; i++) {
        let seatData = {
            journeyId,
            busId,
            seatNo : i+1,
            isBooked : false,
        }
        seatsData.push(seatData);
    }
    return await busRepository.CreateSeats(seatsData);
}

exports.getSeatsByJourneyAndBusId = async (body) => {
    try {
        const {journeyId, busId} = body;
        return await busRepository.getSeatsByJourneyAndBusId(journeyId, busId);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.CheckAvailableSeats = async (body) => {
    const {journeyId, busId, seatNumber, passengerId} = body;
    const checkSeat = await busRepository.checkIfSeatExist(journeyId, busId, seatNumber);
        if (checkSeat.length === 0) {
            throw new Error (`This seat is not present on the bus`);
        }
    const isBooked = await busRepository.checkIfSeatBooked(seatNumber, journeyId, busId);
    if (isBooked.length > 0) {
        throw new Error (`The asked seat is already booked`);
    } else {
        return await busRepository.bookSeats(seatNumber, journeyId, busId, passengerId);
    }
}