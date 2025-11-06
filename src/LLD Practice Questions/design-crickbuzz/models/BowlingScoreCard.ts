import { Observable } from "../interfaces";
import { Ball } from "./Ball";
import { Wicket } from "./Wicket";

export class BowlingScoreCard implements Observable {
    private totalOver: number;
    private runGave: number;
    private wicketTaken: Array<Wicket>;
    private extraRuns: number;

    constructor({
        totalOver,
        runGave,
        wicketTaken,
        extraRuns
    }: {
        totalOver: number;
        runGave: number;
        wicketTaken: Array<Wicket>;
        extraRuns: number;
    }) {
        this.totalOver = totalOver;
        this.runGave = runGave;
        this.wicketTaken = wicketTaken;
        this.extraRuns = extraRuns
    }

    public updateScore(ball: Ball): void {

    }
}