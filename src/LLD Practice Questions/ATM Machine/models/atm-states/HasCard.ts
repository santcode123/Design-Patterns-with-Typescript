import { ATM } from "../ATM";
import { Card } from "../Card";
import { ATMState } from "./ATMState"
import { IdleState } from "./IdleState";

export class HasCardState extends ATMState {
    public enterPin() {
        console.log("please enter the pincode to proceed further");
    }

    public authenticatePin(pin: string, card: Card): void {
        const validated = card.isValidPin(pin)

        if (validated) {
            console.log("Pin has been validated, please select options from the screen");
            // now update the atm state to option state

        } else {
            throw new Error("Invalid Pin!");
        }
    }

    public exit(atm: ATM): void {
        atm.setAtmState(new IdleState()); // make sure we do not introduce the circular dependencies
        console.log("Cancelled, please remove your card!");
    }
}