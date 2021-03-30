const theatreRepository = require("../repository/movieBookingRepository");

exports.CreateTheatreRecord = async (body) => {
    try {
        const {theatreName, rowDetails} = body;
        const data = {
            theatreName, rowDetails
        }
        return await theatreRepository.CreateTheatreRecord(data);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreateMovieRecord = async (body) => {
    try {
        const {movieName, showStartTime, showEndTime, theatreId} = body;
        const data = {
            movieName, showStartTime, showEndTime, theatreId
        }
        return await theatreRepository.CreateMovieRecord(data);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.GetTheatreDetails = async (id) => {
    try {
        return await theatreRepository.getTheatreDetails(id);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreateSeats = async (body) => {
    try {
        const {theatreId, movieId, rowDetails} = body;
        const seatData = {
            movieId, theatreId, row : ``, seatNo : 0, status : `unoccupied`,
        }
        for(let value of rowDetails) {
            const seatArr = [];
            for(let i = 1; i <= value.numberOfSeats; i++) {
                seatData.row = value.rowLabel;
                seatData.seatNo = i;
                let tempSeat = {...seatData};
                seatArr.push(tempSeat);
            }
            await theatreRepository.CreateSeats(seatArr);
        }
        return await theatreRepository.getSeatsData(theatreId, movieId);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.GetAvailableSeats = async (body) => {
    try {
        const {theatreId, movieId} = body;
        return await theatreRepository.getEmptySeatsData(theatreId, movieId)
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.BookASeat = async (body) => {
    try {
        const {theatreId, movieId, row, seatNo, userId} = body;
        const seatStatus = await theatreRepository.CheckSeatStatus(theatreId, movieId, row, seatNo);
        if(!seatStatus) {
            throw new Error (`This seat does not exist`)
        } else if(seatStatus.status === 'occupied') {
            throw new Error (`This seat is already occupied. Please select other seat`)
        } else {
            return await theatreRepository.BookASeat(theatreId, movieId, row, seatNo, userId);
        }
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.BookMultipleSeats = async (body) => {
    try {
        const {theatreId, movieId, seats, userId} = body;
        const bookedSeats = [];
        for(let value of seats) {
            const row = value[0];
            const seatNo = value[1];
            const seatStatus = await theatreRepository.CheckSeatStatus(theatreId, movieId, row, seatNo);
            console.log(seatStatus)
            if(!seatStatus || seatStatus.status === 'occupied') {
                bookedSeats.push(`${row}${seatNo}`)
            }
        }
        if(bookedSeats.length > 0) {
            throw new Error (`Following seats are already booked ${bookedSeats}`);
        } else {
            for(let value of seats) {
                const row = value[0];
                const seatNo = value[1];
                const bookingData = {
                    theatreId, movieId, userId, row, seatNo
                }
                await BookSeat(bookingData);
            }
            return `Seats booked successfully`;
        }
    } catch (err) {
        throw new Error (err.message);
    }
}

const BookSeat = async (body) => {
    try {
        const {theatreId, movieId, row, seatNo, userId} = body;
        const seatStatus = await theatreRepository.CheckSeatStatus(theatreId, movieId, row, seatNo);
        if(!seatStatus) {
            throw new Error (`This seat does not exist`)
        } else if(seatStatus.status === 'occupied') {
            throw new Error (`This seat is already occupied. Please select other seat`)
        } else {
            return await theatreRepository.BookASeat(theatreId, movieId, row, seatNo, userId);
        }
    } catch (err) {
        throw new Error (err.message)
    }
}