import { Ball } from "./Ball";
import { Player } from "./Player";


export class Over {
    private overNumber: number;
    private bowler: Player; // we need to figure out that this is really needed or not
    private extraRuns: number;
    private listOfBalls: Array<Ball>;

    constructor({
        overNumber,
        bowler,
        extraRuns,
        listOfBalls
    }: {
        overNumber: number;
        bowler: Player;
        extraRuns: number;
        listOfBalls: Array<Ball>
    }) {
        this.overNumber = overNumber;
        this.bowler = bowler;
        this.extraRuns = extraRuns;
        this.listOfBalls = listOfBalls;
    }
    public setBowler(bowler: Player) {
        this.bowler = bowler;
    }

    public getBalls() {
        return this.listOfBalls;
    }

    public startOver() {
        // logic to  start the over
    }
}