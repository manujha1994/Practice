const repository = require("../repository/repository");

exports.CreatePlayer = async (body) => {
    try {
        return await repository.CreatePlayer(body);
    } catch (err) {
        throw new Error (err.message)
    }
};
exports.CreateTeams = async (body) => {
    try {
        return await repository.CreateTeams(body);
    } catch (err) {
        throw new Error (err.message)
    }
};
exports.CreateMatch = async (body) => {
    try {
        return await repository.CreateMatch(body);
    } catch (err) {
        throw new Error (err.message)
    }
};
exports.updateScore = async (body) => {
    try {
        const {matchId, battingTeamId, batsmanId, isWicket, overNumber, ballNumber, run} = body;
        let over = overNumber;
        let ballNo = 0 ;
        let newRun = 0;
        if (ballNumber == 1) {
            over --;
            ballNo = 6;
        } else {
            ballNo = ballNumber - 1;
        }
        const checkForExistingData = await repository.getCurrentScore(matchId, battingTeamId, overNumber, ballNumber);
        if(checkForExistingData.length > 0) {
            throw new Error(`Entry already present`)
        }
        const currentScoreCard = await repository.getCurrentScore(matchId, battingTeamId, over, ballNo);
        if(currentScoreCard.length == 0) {
            newRun = run;
        } else {
            newRun = currentScoreCard[0].run + run;
        }
        body.run = newRun;
        await repository.CreateScore(body);
        return await playerStatUpsert(matchId, batsmanId, run, isWicket);
    } catch (err) {
        throw new Error (err.message)
    }
};

const playerStatUpsert = async (matchId, playerId, run, isWicket) => {
    const playerStatus = {};
    const playerStat = await repository.GetPlayerStat(matchId, playerId);
    const shallowStat = {...playerStat}
    if(playerStat.length == 0) {
        playerStatus.matchId = matchId;
        playerStatus.playerId = playerId;
        playerStatus.totalRuns = run;
        playerStatus.totalFour = 1 ? run == 4 : 0;
        playerStatus.totalSixes = 1 ? run == 6 : 0;
        playerStatus.isOut = isWicket;
        return await repository.CreatePlayerStat(playerStatus);
    } else {
        playerStatus.matchId = matchId;
        playerStatus.playerId = playerId;
        playerStatus.totalRuns = shallowStat[0].totalRuns + run;
        if(run === 4) {
            console.log(typeof(shallowStat[0].totalFour))
            playerStatus.totalFour = shallowStat[0].totalFour+1;
        } else {
            playerStatus.totalFour = shallowStat[0].totalFour;
        }
        if(run === 6) {
            playerStatus.totalSixes = shallowStat[0].totalSixes+1;
        } else {
            playerStatus.totalSixes = shallowStat[0].totalSixes;
        }
        playerStatus.isOut = isWicket || false;
        return await repository.UpdatePlayerStat({...playerStatus});
    }
}