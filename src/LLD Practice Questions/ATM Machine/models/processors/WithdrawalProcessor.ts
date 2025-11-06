import { ATM } from "../ATM";
import { UserBank } from "../UserBank";


export abstract class WithdrawalProcess {
    private nextProcessor: WithdrawalProcess | null;
    protected notesCount: number;
    protected amountPerNote: number;

    constructor(nextProcessor: WithdrawalProcess | null, notesCount: number, amountPerNote: number) {
        this.nextProcessor = nextProcessor;
        this.notesCount = notesCount;
        this.amountPerNote = amountPerNote;
    }

    abstract reduceNotes(atm: ATM, notesReduced: number): boolean;

    public withdraw(amount: number, atm: ATM, bankAcc: UserBank) {
        // how much we can width from current state

        const response = { success: false, amount: 0 };

        if (amount === 0) {
            // base case 0
            response.success = true;
            return response;
        }

        const maxNotesToBeTaken = Math.floor(amount / this.amountPerNote);

        const notesToBeConsidered = Math.min(maxNotesToBeTaken, this.notesCount);

        let balance = amount - notesToBeConsidered * this.amountPerNote;

        if (balance < 0) {
            throw new Error('Somthing went wrong while withdwal!');
        }

        // case 2
        if (!this.nextProcessor && balance > 0) {
            return response;
        }

        if (balance === 0) {
            response.success = true;
            response.amount = amount;
            return response;
        }

        const nextProcessorResponse = this.nextProcessor?.withdraw(balance, atm, bankAcc);

        if (!nextProcessorResponse?.success) {
            return response;
        }


        // we need to reduce atm and bank amount
        bankAcc.withdrawAmount(notesToBeConsidered * this.amountPerNote);
        const amountDeducted = this.reduceNotes(atm, notesToBeConsidered);

        if (!amountDeducted) {
            bankAcc.depositAmount(notesToBeConsidered * this.amountPerNote); // revert back withdrwal money
            throw new Error('Error while deducting money from atm or bank');
        }



        response.success = true;
        response.amount = amount;


        return response;


    }


}