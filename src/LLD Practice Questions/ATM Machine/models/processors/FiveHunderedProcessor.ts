import { ATM } from "../ATM";
import { WithdrawalProcess } from "./WithdrawalProcessor";




export class FiveHunderedNotesProcessor extends WithdrawalProcess {
    public reduceNotes(atm: ATM, notesReduced: number): boolean {
        // reduce from atm and bank 

        const atmNodes = atm.getFiveHunderdNotes();
        const total500Notes = this.notesCount;

        const notesCountAfterWithdrawal = atmNodes - notesReduced;

        if (notesCountAfterWithdrawal < 0 || total500Notes !== atmNodes) {
            throw new Error("no change available");
        }

        atm.setFiveHunderedNotes(notesCountAfterWithdrawal);
        this.notesCount = notesCountAfterWithdrawal;

        return true;
    }
}