import { BatterController } from "../controllers/BatterController";
import { BowlerController } from "../controllers/BowlerController";
import { Player } from "./Player";

export class Team {
    private teamName: string;
    private listOfBatters: Array<Player>;
    private listOfBowlers: Array<Player>;
    private batterController: BatterController;
    private bowlerController: BowlerController;

    constructor({
        teamName,
        listOfBatters,
        listOfBowlers,
        batterController,
        bowlerController
    }: {
        teamName: string;
        listOfBatters: Array<Player>;
        listOfBowlers: Array<Player>;
        batterController: BatterController;
        bowlerController: BowlerController;
    }) {
        this.teamName = teamName;
        this.listOfBatters = listOfBatters;
        this.listOfBowlers = listOfBowlers;
        this.batterController = batterController;
        this.bowlerController = bowlerController;
    }

    public getBatterController() {
        return this.batterController;
    }

    public getBowlerController() {
        return this.bowlerController;
    }
}