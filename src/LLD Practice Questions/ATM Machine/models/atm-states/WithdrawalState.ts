import { ATM } from "../ATM";
import { Card } from "../Card";
import { FiveHunderedNotesProcessor } from "../processors/FiveHunderedProcessor";
import { HunderedNoteProcessor } from "../processors/HunderedProcessor";
import { TwoThousandNoteProcessor } from "../processors/TwoThousandProcessor";
import { ATMState } from "./ATMState";
import { IdleState } from "./IdleState";


export class WithdrawalState extends ATMState {
    constructor() {
        super();
        console.log("please enter the amount:");
    }
    public withdraw(amount: number, card: Card, atm: ATM): void {
        // check we have sufficent balance in atm and bank
        const atmBalance = atm.getFiveHunderdNotes() * 500 + atm.getHunderedNotes() * 100 + atm.getTwoThousandsNotes() * 2000;

        console.log("atm balance:", atmBalance);
        const hasAtmSufficentBalance = amount <= atmBalance;

        if (!hasAtmSufficentBalance) {
            throw new Error('Atm does not sufficent balance');
        }

        const bankBalance = card.checkBalance(); // card balance represents the balance available in the bank account

        const hasSufficentBankBalance = amount <= bankBalance;

        if (!hasSufficentBankBalance) {
            throw new Error('bank does not suffient balance!');
        }

        // now we have balance at atm and bank so we need to withdraw money based on chain of responsibilility design pattern
        const twoThousandsNotes = atm.getTwoThousandsNotes();
        const fiveHunderedNotes = atm.getFiveHunderdNotes();
        const hunderedNotes = atm.getHunderedNotes();

        const hunderedNotesProcessor = new HunderedNoteProcessor(null, hunderedNotes, 100);

        const fiveHunderNotesProcessor = new FiveHunderedNotesProcessor(hunderedNotesProcessor, fiveHunderedNotes, 500);

        const twoThousandNotesProcessor = new TwoThousandNoteProcessor(fiveHunderNotesProcessor, twoThousandsNotes, 2000);

        const { success } = twoThousandNotesProcessor.withdraw(amount, atm, card.getBankAccount());

        if (!success) {
            console.log("No change available");
            this.exit(atm);
            return;
        }

        console.log(`Please collect your cash of amount: ${amount} and remove the card`);

        this.exit(atm);
    }

    public exit(atm: ATM): void {
        atm.setAtmState(new IdleState());
        console.log('please remove your card!');
    }
}