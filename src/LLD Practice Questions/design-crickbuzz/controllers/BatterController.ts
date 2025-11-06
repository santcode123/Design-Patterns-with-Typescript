import { RunType } from "../enums";
import { Ball } from "../models/Ball";
import { Player } from "../models/Player";

export class BatterController {
    private yetToBet: Array<Player>;
    private alreadyPlayed: Array<Player>;
    private onStrike: Player | null;
    private nonStrike: Player | null;

    constructor({ yetToBet, alreadyPlayed }: { yetToBet: Array<Player>; alreadyPlayed: Array<Player> }) {
        this.yetToBet = yetToBet;
        this.alreadyPlayed = alreadyPlayed; // depedency injections
        this.onStrike = null;
        this.nonStrike = null;
    }

    public rotateStrike() {
        const temp = this.onStrike;
        this.onStrike = temp;
        this.nonStrike = temp;
    }
    public getNextPlayer() {
        const nextPlayer = this.yetToBet[0];
        this.yetToBet = this.yetToBet.slice(1);
        return nextPlayer;
    }

    public getOnStrikePlayer() {
        if (this.onStrike) {
            return this.onStrike;
        }

        const nextPlayer = this.getNextPlayer();
        this.onStrike = nextPlayer;

        return nextPlayer;

    }


    public getNonStrikePlayer() {
        if (this.nonStrike) {
            return this.nonStrike;
        }

        const nextPlayer = this.getNextPlayer();
        this.nonStrike = nextPlayer;

        return nextPlayer;
    }


    public listenBall(ball: Ball) {
        const wicket = ball.getWicket();

        if (ball.getRun() === RunType.ONE) {
            const ballPlayedPlayer = this.onStrike;

            this.onStrike = this.nonStrike;
            this.nonStrike = ballPlayedPlayer;
        }

        if (wicket) {
            this.alreadyPlayed.push(wicket.getPlayer());
            this.onStrike = this.yetToBet[0];
            this.yetToBet = this.yetToBet.slice(1);
        }
    }
}