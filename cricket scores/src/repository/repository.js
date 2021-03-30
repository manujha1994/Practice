const Players = require("../models/players");
const Teams = require("../models/teams");
const Match = require("../models/match");
const ScoreCard = require("../models/scoreCard");
const PlayerStats = require("../models/playerStats");

exports.CreatePlayer = async (body) => {
    return Players.create(body);
}
exports.CreateTeams = async (body) => {
    return Teams.create(body);
}
exports.CreateMatch = async (body) => {
    return Match.create(body);
}

exports.getCurrentScore = async (matchId, battingTeamId, overNumber, ballNumber) => {
    return ScoreCard.find({matchId, battingTeamId, overNumber, ballNumber});
}

exports.CreateScore = async (body) => {
    return ScoreCard.create(body);
}

exports.GetPlayerStat = async (matchId, playerId) => {
    return PlayerStats.find({matchId, playerId});
}

exports.CreatePlayerStat = async (body) => {
    return PlayerStats.create(body);
}

exports.updateScore = async (matchId, battingTeamId, overNumber, ballNumber, run, isWicket, isExtra, extraType, runsTillNow, wickets) => {
    return ScoreCard.updateOne({matchId, battingTeamId, overNumber, ballNumber}, {$set: {run,isWicket: isWicket || false, isExtra: isExtra || false,
            extraType: extraType || ``, runsTillNow, wickets}});
}

exports.UpdatePlayerStat = async (body) => {
    return PlayerStats.updateOne({matchId : body.matchId,playerId : body.playerId}, {$set: {totalRuns : body.totalRuns, totalFour: body.totalFour,
            totalSixes: body.totalSixes, isOut: body.isOut}});
}

