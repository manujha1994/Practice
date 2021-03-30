const httpStatus = require('http-status');
const service = require('../services/service');

exports.ping = async (req, res, next) => {
    return res.status(httpStatus.OK).json(`pong service`);
};

exports.CreatePlayer = async (req, res, next) => {
    try {
        const playerData = await service.CreatePlayer(req.body);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.CreateTeam = async (req, res, next) => {
    try {
        const playerData = await service.CreateTeam(req.body);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.CreatePlayerTeamMapping = async (req, res, next) => {
    try {
        const playerData = await service.CreatePlayerTeamMapping(req.body);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.CreateMatch = async (req, res, next) => {
    try {
        const playerData = await service.CreateMatch(req.body);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.UpdateScore = async (req, res, next) => {
    try {
        const playerData = await service.UpdateScore(req.body);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.GetCurrentScore = async (req, res, next) => {
    try {
        const playerData = await service.GetCurrentScore(req.query);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.GetPlayerStat = async (req, res, next) => {
    try {
        const playerData = await service.GetPlayerStat(req.query);
        res.status(httpStatus.OK).json(playerData);
    } catch (err) {
        next(err);
    }
};

exports.GetNewsApiDetails = async (req, res, next) => {
    try {
        const newsData = await service.GetNewsApiDetails(req.query);
        res.status(httpStatus.OK).json(newsData.data);
    } catch (err) {
        next(err);
    }
};
