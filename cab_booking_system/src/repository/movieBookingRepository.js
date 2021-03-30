const Theatre = require("../models/theatre");
const Movie = require("../models/movie");
const Seats = require("../models/theatreSeats");

exports.CreateTheatreRecord = async (body) => {
    return Theatre.create(body);
}

exports.CreateMovieRecord = async (body) => {
    return Movie.create(body);
}

exports.getTheatreDetails = async (id) => {
    return Theatre.findById(id);
}

exports.CreateSeats = async (body) => {
    // return Seats.create(body);
    return Seats.insertMany(body);
}

exports.getSeatsData = async (theatreId, movieId) => {
    return await Seats.find({theatreId, movieId});
}

exports.getEmptySeatsData = async (theatreId, movieId) => {
    return await Seats.find({theatreId, movieId, status: "unoccupied"});
}

exports.BookASeat = async (theatreId, movieId, row, seatNo, userId) => {
    return Seats.updateOne({theatreId, movieId, row, seatNo}, {$set: {status: 'occupied', userId}});
}

exports.CheckSeatStatus = async (theatreId, movieId, row, seatNo) => {
    return await Seats.findOne({theatreId, movieId, row, seatNo});
}