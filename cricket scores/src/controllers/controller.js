const httpStatus = require('http-status');
const service = require('../services/service');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong service`);
};

exports.CreatePlayer = async (req, res, next) => {
    try {
        const data = await service.CreatePlayer(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.CreateTeams = async (req, res, next) => {
    try {
        const data = await service.CreateTeams(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.CreateMatch = async (req, res, next) => {
    try {
        const data = await service.CreateMatch(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};

exports.UpdateScore = async (req, res, next) => {
    try {
        const data = await service.updateScore(req.body);
        return res.status(httpStatus.OK).json(data);
    } catch (err) {
        next(err);
    }
};
