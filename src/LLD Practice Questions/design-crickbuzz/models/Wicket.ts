import { WicketType } from "../enums";
import { Player } from "./Player";


export class Wicket {
    private wicketNumber: number;
    private wicketPlayer: Player;
    private wicketType: WicketType;

    constructor({
        wicketNumber,
        wicketPlayer,
        wicketType
    }: {
        wicketNumber: number;
        wicketPlayer: Player;
        wicketType: WicketType
    }) {
        this.wicketNumber = wicketNumber;
        this.wicketPlayer = wicketPlayer;
        this.wicketType = wicketType;
    }

    public getPlayer() {
        return this.wicketPlayer;
    }
}