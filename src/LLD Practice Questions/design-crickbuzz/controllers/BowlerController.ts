import { Player } from "../models/Player";

export class BowlerController {
    private listOfBowlers: Array<Player>;
    private overDelivered: Array<number>;

    constructor({ listOfBowlers, overDelivered }: { listOfBowlers: Array<Player>; overDelivered: Array<number> }) {
        this.listOfBowlers = listOfBowlers;
        this.overDelivered = overDelivered;
    }

    public getNextBowler() {
        const findIndex = this.overDelivered.findIndex(data => data < 5); // assumming one bowler can deliver at max 5 overs in our use case

        if (findIndex === -1) {
            throw new Error('Error while getting next Bowler!');
        }

        return this.listOfBowlers[findIndex];
    }
}