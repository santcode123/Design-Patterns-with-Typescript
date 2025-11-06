import { BallType, RunType } from "../enums";
import { Observable } from "../interfaces";
import { Player } from "./Player";
import { Wicket } from "./Wicket";


export class Ball {
    private ballNumber: number;
    private bowler: Player;
    private playedBy: Player | null;
    private wicket: Wicket | null;
    private run: RunType | number;
    private ballType: BallType;
    private listOfObservers: Array<Observable>

    constructor({
        ballNumber,
        bowler,
        playedBy,
        wicket,
        run,
        ballType,
        listOfObservers
    }: {
        ballNumber: number;
        bowler: Player;
        playedBy: Player | null;
        wicket?: Wicket;
        run?: RunType;
        ballType: BallType,
        listOfObservers: Array<Observable>
    }) {
        this.ballNumber = ballNumber;
        this.bowler = bowler;
        this.playedBy = playedBy;
        this.wicket = wicket || null;
        this.run = run || 0;
        this.ballType = ballType;
        this.listOfObservers = listOfObservers;
    }

    public updater() {
        // for each ball we need to update the score, so we will use observer pattern to achieve that
    }

    public getWicket() {
        return this.wicket;
    }

    public getRun() {
        return this.run;
    }

    public setRun(run: RunType) {
        this.run = run;
    }

    public setBaller(bowler: Player) {
        this.bowler = bowler;
    }

    public setPlayer(player: Player) {
        this.playedBy = player;
    }

    public setWicket(wicket: Wicket) {
        this.wicket = wicket;
    }

    public getObservers() {
        return this.listOfObservers;
    }
}