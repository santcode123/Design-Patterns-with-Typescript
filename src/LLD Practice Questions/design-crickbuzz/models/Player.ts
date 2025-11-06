
import { PlayerType } from '../enums';
import { BattingScoreCard } from './BattingScoreCard';
import { BowlingScoreCard } from './BowlingScoreCard';
import { Person } from './Person';

export class Player {
    private playerNumber: number;
    private person: Person;
    private playerType: PlayerType;
    private battingScoreCard: BattingScoreCard;
    private bowlingScoreCard: BowlingScoreCard;

    constructor({
        playerNumber,
        person,
        playerType,
        battingScoreCard,
        bowlingScoreCard
    }: {
        playerNumber: number;
        person: Person;  // dependency injection
        playerType: PlayerType;
        battingScoreCard: BattingScoreCard;
        bowlingScoreCard: BowlingScoreCard;
    }) {
        this.playerNumber = playerNumber;
        this.person = person;
        this.playerType = playerType;
        this.battingScoreCard = battingScoreCard;
        this.bowlingScoreCard = bowlingScoreCard;
    }

    public getPlayerNumber() {
        return this.playerNumber;
    }
}