
import { ATMState } from "./atm-states/ATMState";
import { IdleState } from "./atm-states/IdleState";
import { Card } from "./Card";
export class ATM {
    private atmState: ATMState;
    private twoThousandNotes: number = 0;
    private fivehunderedNotes: number = 0;
    private hunderedNotes: number = 0;

    constructor({ twoThousandNotes, fivehunderedNotes, hunderedNotes }:
        { twoThousandNotes: number; fivehunderedNotes: number; hunderedNotes: number }) {
        this.hunderedNotes = hunderedNotes;
        this.fivehunderedNotes = fivehunderedNotes;
        this.twoThousandNotes = twoThousandNotes;
        this.atmState = new IdleState();
    }

    public setAtmState(atmState: ATMState) {
        this.atmState = atmState;
    }

    public getAtmState() {
        return this.atmState;
    }

    public getTwoThousandsNotes() {
        return this.twoThousandNotes;
    }

    public setTwoThousandNotes(notes: number) {
        this.twoThousandNotes = notes;
    }

    public getFiveHunderdNotes() {
        return this.fivehunderedNotes;
    }

    public setFiveHunderedNotes(notes: number) {
        this.fivehunderedNotes = notes;
    }

    public getHunderedNotes() {
        return this.hunderedNotes;
    }

    public setHunderedNotes(notes: number) {
        this.hunderedNotes = notes;
    }

    public readCard(card: Card) {
        const cardNumber = card.getCardNumber();

        if (cardNumber.length >= 8) {
            return true;
        }

        return false;
    }
}