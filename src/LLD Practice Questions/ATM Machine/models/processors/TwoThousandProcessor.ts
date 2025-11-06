import { ATM } from "../ATM";
import { WithdrawalProcess } from "./WithdrawalProcessor";




export class TwoThousandNoteProcessor extends WithdrawalProcess {
    public reduceNotes(atm: ATM, notesReduced: number): boolean {
        // reduce from atm and bank 

        const atmNodes = atm.getTwoThousandsNotes();
        const total2000Notes = this.notesCount;

        const notesCountAfterWithdrawal = atmNodes - notesReduced;

        if (notesCountAfterWithdrawal < 0 || total2000Notes !== atmNodes) {
            throw new Error("no change available");
        }

        atm.setTwoThousandNotes(notesCountAfterWithdrawal);
        this.notesCount = notesCountAfterWithdrawal;

        return true;
    }
}