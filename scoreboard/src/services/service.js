const Players = require("../models/players");
const Teams = require("../models/teams");
const PlayerTeamMapping = require("../models/playerTeamMapping");
const Match = require("../models/match");
const ScoreCard = require("../models/scoreCard");
const PlayerStats = require("../models/playerStats");
const axios = require("axios");
const CONSTANTS = require("../constant");

exports.CreatePlayer = async (body) => {
    try {
        return await Players.insertMany(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreateTeam = async (body) => {
    try {
        return await Teams.insertMany(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreatePlayerTeamMapping = async (body) => {
    try {
        return await PlayerTeamMapping.insertMany(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.CreateMatch = async (body) => {
    try {
        return await Match.create(body);
    } catch (err) {
        throw new Error (err.message)
    }
};

exports.UpdateScore = async (body) => {
    try {
        const {battingTeamId, overNumber, ballNumber} = body;
        let checkIfExist = await checkIfExists(battingTeamId, overNumber, ballNumber);
        if(checkIfExist) {
            throw new Error('Duplicate entry being created for this ball');
        }
        if(overNumber == 1 && ballNumber == 1) {
            await updateBatsmanStat(body);
            return await ScoreCard.create(body);
        } else {
            const updateScore = await updateCurrentScore(body);
            const updatePlayerStat = await updateBatsmanStat(body);
            return {updateScore, updatePlayerStat};
        }
    } catch (err) {
        throw new Error (err.message)
    }
};

const getCurrentScore = async (battingTeamId, overNumber, ballNumber) => {
    try {
        // return await ScoreCard.find({battingTeamId, overNumber, ballNumber}).sort({overNumber: 1, ballNumber: -1}).limit(1);
        return await ScoreCard.find({battingTeamId}).sort({overNumber: -1, ballNumber: -1}).limit(1);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.GetCurrentScore = async (body) => {
    try {
        const {battingTeamId, overNumber, ballNumber} = body;
        return await getCurrentScore(battingTeamId, overNumber, ballNumber);
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.GetPlayerStat = async (body) => {
    try {
        const {matchId, PlayerId} = body;
        console.log(matchId, PlayerId)
        return await PlayerStats.findOne({matchId, PlayerId});
    } catch (err) {
        throw new Error (err.message)
    }
}

const checkIfExists = async (battingTeamId, overNumber, ballNumber) => {
    try {
        const currentBallScore = await ScoreCard.find({battingTeamId, overNumber, ballNumber});
        let len = currentBallScore.length;
        if(currentBallScore && len > 0) {
            if(!currentBallScore[len-1].isExtra) return true;
        }
        return false;
    } catch (err) {
        throw new Error (err.message)
    }
}

const updateCurrentScore = async (body) => {
    try {
        let {battingTeamId, overNumber, ballNumber, run} = body;
        if (ballNumber == 1) overNumber -- ;
        else ballNumber -- ;
        const previousBallScore = await getCurrentScore(battingTeamId, overNumber, ballNumber);
        const len = previousBallScore.length;
        const oldScore = previousBallScore[len-1];
        body.totalRuns = oldScore.totalRuns + run;
        return await ScoreCard.create(body);
    } catch (err) {
        throw new Error (err.message)
    }
}

const updateBatsmanStat = async (body) => {
    try {
        const {matchId, batsmanId, run, isWicket} = body;
        const getCurrentStat = await PlayerStats.findOne({matchId, PlayerId: batsmanId});
        if(!getCurrentStat){
            return PlayerStats.create({matchId, PlayerId: batsmanId, totalRuns: run, isOut: isWicket});
        } else {
            return PlayerStats.update({matchId, PlayerId: batsmanId},{$set:{totalRuns: getCurrentStat.totalRuns + run, isOut: isWicket}});
        }
    } catch (err) {
        throw new Error (err.message)
    }
}

exports.GetNewsApiDetails = async (query) => {
    try {

        const newsApiBaseUrl = CONSTANTS.NEWS_API_BASE_URL;
        query.apiKey = CONSTANTS.NEWS_API_KEY;
        const urlToGet = `${newsApiBaseUrl}/everything`;
        return await axios.get(urlToGet, {params : query});
    } catch (err) {
        throw new Error (err.message)
    }
}
