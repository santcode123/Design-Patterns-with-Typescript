import { RunType, WicketType } from "../enums";
import { isWicket, runHitByPlayer } from "../services/PlayerOutCome";
import { Over } from "./Over";
import { Team } from "./Team";
import { Wicket } from "./Wicket";


export class Inning {
    private battingTeam: Team;
    private bowlingTeam: Team;
    private listOfOvers: Array<Over>;
    constructor({
        battingTeam,
        bowlingTeam,
        listOfOvers
    }: {
        battingTeam: Team;
        bowlingTeam: Team;
        listOfOvers: Array<Over>
    }) {
        this.battingTeam = battingTeam;
        this.bowlingTeam = bowlingTeam;
        this.listOfOvers = listOfOvers;

    }

    public rotateStrike() {
        // if player took 1 run then we need to rotate the stike
        const battingTeamController = this.battingTeam.getBatterController();

        battingTeamController.rotateStrike();
    }

    public startInning() {
        // need to go through all the overs and play each over balls
        for (let i = 0; i < this.listOfOvers.length; i++) {
            const over = this.listOfOvers[i];


            const listOfBalls = over.getBalls();
            const batterController = this.battingTeam.getBatterController();
            const bowlingController = this.bowlingTeam.getBowlerController();

            const bowler = bowlingController.getNextBowler();

            for (let j = 0; j < listOfBalls.length; j++) {
                const ball = listOfBalls[j];
                const onStrikePlayer = batterController.getOnStrikePlayer();

                ball.setPlayer(onStrikePlayer);
                ball.setBaller(bowler);

                // let player has played something based on that we gonna do something
                const run = runHitByPlayer();
                ball.setRun(run);

                if (run === RunType.ONE) {
                    this.rotateStrike();
                }

                if (run === RunType.NONE) {
                    // check possibility of wicket
                    const hasWicket = isWicket();
                    if (hasWicket) {

                        const wicket = new Wicket({ wicketNumber: onStrikePlayer.getPlayerNumber(), wicketPlayer: onStrikePlayer, wicketType: WicketType.BOWLED })
                        ball.setWicket(wicket);
                    }
                }

                // after each ball we need to update the score and all info
                for (const observer of ball.getObservers()) {
                    observer.updateScore(ball);
                }
            }

            // we need to decide the  bowler and batter on th spot
        }
    }

    public totalRuns() {

    }
}