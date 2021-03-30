const httpStatus = require('http-status');
const movieService = require('../services/movieBookingService');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong movie service`);
};

exports.createTheatre = async (req, res, next) => {
    try {
        const data = await movieService.CreateTheatreRecord(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.createMovie = async (req, res, next) => {
    try {
        const data = await movieService.CreateMovieRecord(req.body);
        const theatreData = await movieService.GetTheatreDetails(data["theatreId"]);
        const SeatData = {
            theatreId : data["theatreId"],
            movieId : data["_id"],
            rowDetails : theatreData.rowDetails
        }
        const createdSeats = await movieService.CreateSeats(SeatData);
        return res.status(httpStatus.OK).json(createdSeats);
    } catch (err) {
        next(err);
    }
};

exports.getEmptySeats = async (req, res, next) => {
    try {
        const data = await movieService.GetAvailableSeats(req.query);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.bookASeat = async (req, res, next) => {
    try {
        const data = await movieService.BookASeat(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.bookMultipleSeats = async (req, res, next) => {
    try {
        const data = await movieService.BookMultipleSeats(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};


