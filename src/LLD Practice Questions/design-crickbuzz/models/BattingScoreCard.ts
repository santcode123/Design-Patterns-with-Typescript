import { RunType } from "../enums";
import { Observable } from "../interfaces";
import { Ball } from "./Ball";


export class BattingScoreCard implements Observable {
    private totalRun: number;
    private totalBallPlayed: number;
    private totalFour: number;
    private totalSix: number;
    private strikeRate: number;

    constructor({
        totalRun,
        totalBallPlayed,
        totalFour,
        totalSix,
        strikeRate
    }: {
        totalRun: number;
        totalBallPlayed: number;
        totalFour: number;
        totalSix: number;
        strikeRate: number;

    }) {
        this.totalRun = totalRun;
        this.totalBallPlayed = totalBallPlayed;
        this.totalFour = totalFour;
        this.totalSix = totalSix;
        this.strikeRate = strikeRate;
    }

    public updateScore(ball: Ball) {
        const run = ball.getRun();
        this.totalRun = this.totalRun + ball.getRun();
        this.totalBallPlayed = this.totalBallPlayed + 1;
        if (run === RunType.FOUR) {
            this.totalFour = this.totalFour + 1;
        }

        if (run === RunType.SIX) {
            this.totalSix = this.totalSix + 1;
        }

        this.strikeRate = this.totalRun / this.totalBallPlayed;

    }
}