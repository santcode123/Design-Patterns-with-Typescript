import { BatterController } from "./controllers/BatterController";
import { BowlerController } from "./controllers/BowlerController";
import { BallType, PlayerType, RunType } from "./enums";
import { Ball } from "./models/Ball";
import { BattingScoreCard } from "./models/BattingScoreCard";
import { BowlingScoreCard } from "./models/BowlingScoreCard";
import { Inning } from "./models/Inning";
import { Match } from "./models/Match";
import { Over } from "./models/Over";
import { Person } from "./models/Person";
import { Player } from "./models/Player";
import { Team } from "./models/Team";
import { T20Match } from "./services/MatchType";




function getRandomBatter({ playerNumber, name }: { playerNumber: number, name: string }) {
    const batterScoreCard = new BattingScoreCard({ totalBallPlayed: 0, totalFour: 0, totalRun: 0, totalSix: 0, strikeRate: 0 });
    const bowlingScoreCard = new BowlingScoreCard({ runGave: 0, totalOver: 0, wicketTaken: [], extraRuns: 0 });
    const newPerson = new Person({ name, age: 24 + Math.ceil(Math.random() * 10) });
    const batter = new Player({ playerNumber, playerType: PlayerType.BATTTER, person: newPerson, battingScoreCard: batterScoreCard, bowlingScoreCard })
    return batter;
}

function getRandomBowler({ playerNumber, name }: { playerNumber: number; name: string }) {
    const batterScoreCard = new BattingScoreCard({ totalBallPlayed: 0, totalFour: 0, totalRun: 0, totalSix: 0, strikeRate: 0 });
    const bowlingScoreCard = new BowlingScoreCard({ runGave: 0, totalOver: 0, wicketTaken: [], extraRuns: 0 });
    const newPerson = new Person({ name, age: 24 + Math.ceil(Math.random() * 10) });
    const bowler = new Player({ playerNumber, playerType: PlayerType.BOWLER, person: newPerson, battingScoreCard: batterScoreCard, bowlingScoreCard })
    return bowler;
}

function getBallsForAnOver(bowler: Player, playedBy: Player | null) {
    const listOfBalls = [];

    for (let i = 0; i < 6; i++) {
        const ball = new Ball({ ballNumber: i + 1, bowler: bowler, playedBy, listOfObservers: [], ballType: BallType.NORMAL });
        listOfBalls.push(ball);
    }

    return listOfBalls;
}

function get20Overs(bowlerList: Array<Player>) {
    // each player /bowler can deliver at max 5 overs
    const listOfOvers = [];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < bowlerList.length; j++) {
            const listOfBalls = getBallsForAnOver(bowlerList[j], null);
            const over = new Over({ overNumber: (i * j + j + 1), bowler: bowlerList[j], extraRuns: 0, listOfBalls });
            listOfOvers.push(over);
            if (listOfOvers.length >= 20) {
                return listOfOvers;
            }
        }
    }

    return listOfOvers;
}


function crickBuzzDemo() {
    // suppose we have selected one team and what will happen next 
    // create two teams A and B
    const listOfBattersOfTeamA = [];
    const listOfBattersOfTeamB = [];
    const listOfBowlersForTeamA = [];
    const listOfBowlersForTeamB = [];

    for (let i = 0; i < 7; i++) {
        const randomBatterForTeamA = getRandomBatter({ playerNumber: i + 1, name: `TeamA-A${i + 1}` });
        const randomBatterForTeamB = getRandomBatter({ playerNumber: i + 1, name: `TeamB-A${i + 1}` });
        listOfBattersOfTeamA.push(randomBatterForTeamA);
        listOfBattersOfTeamB.push(randomBatterForTeamB);
    }

    for (let i = 7; i < 11; i++) {
        const randomBowlerForTeamA = getRandomBowler({ playerNumber: i + 1, name: `TeamA-B${i + 1}` });
        const randomBowlerForTeamB = getRandomBowler({ playerNumber: i + 1, name: `TeamB-B${i + 1}` });
        listOfBowlersForTeamA.push(randomBowlerForTeamA);
        listOfBowlersForTeamB.push(randomBowlerForTeamB);
    }

    const batterControllerOfTeamA = new BatterController({ yetToBet: [...listOfBattersOfTeamA, ...listOfBowlersForTeamA], alreadyPlayed: [] });
    const bowlerControllerOfTeamA = new BowlerController({ listOfBowlers: listOfBowlersForTeamA, overDelivered: listOfBowlersForTeamA.map(_ => 0) });
    const teamA = new Team({
        teamName: 'team A', listOfBatters: listOfBattersOfTeamA,
        listOfBowlers: listOfBowlersForTeamA,
        batterController: batterControllerOfTeamA,
        bowlerController: bowlerControllerOfTeamA
    });

    const batterControllerOfTeamB = new BatterController({ yetToBet: [...listOfBattersOfTeamB, ...listOfBowlersForTeamB], alreadyPlayed: [] });
    const bowlerControllerOfTeamB = new BowlerController({ listOfBowlers: listOfBowlersForTeamB, overDelivered: listOfBowlersForTeamB.map(_ => 0) });

    const teamB = new Team({
        teamName: 'team B',
        listOfBatters: listOfBattersOfTeamB,
        listOfBowlers: listOfBowlersForTeamB,
        batterController: batterControllerOfTeamB,
        bowlerController: bowlerControllerOfTeamB
    });

    // we have tossed and team a is winner and choose to play

    const matchType = new T20Match();


    // innings
    const inning1 = new Inning({ battingTeam: teamA, bowlingTeam: teamB, listOfOvers: get20Overs(listOfBattersOfTeamA) });
    const inning2 = new Inning({ battingTeam: teamB, bowlingTeam: teamA, listOfOvers: get20Overs(listOfBattersOfTeamB) })
    const innings = [inning1, inning2];

    const match = new Match({ teamA, teamB, tossWinnerTeam: teamA, matchType, innings });


    // now we need to start the match

    match.startMatch();

}