import { ATM } from "../ATM";
import { Card } from "../Card";
import { ATMState } from "./ATMState";
import { HasCardState } from "./HasCard";


export class IdleState extends ATMState {
    public insertCard(card: Card, atm: ATM): void {
        const hasValidCard = atm.readCard(card);

        if (hasValidCard) {
            atm.setAtmState(new HasCardState())
        } else {
            throw new Error('Please remove card and try again, we are unable to read the card!');
        }
    }
}