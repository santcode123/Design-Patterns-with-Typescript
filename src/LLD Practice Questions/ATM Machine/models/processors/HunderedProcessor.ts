import { ATM } from "../ATM";
import { WithdrawalProcess } from "./WithdrawalProcessor";


export class HunderedNoteProcessor extends WithdrawalProcess {
    public reduceNotes(atm: ATM, notesReduced: number): boolean {
        // reduce from atm and bank 

        const atmNodes = atm.getHunderedNotes();
        const total100Notes = this.notesCount;

        const notesCountAfterWithdrawal = atmNodes - notesReduced;

        if (notesCountAfterWithdrawal < 0 || total100Notes !== atmNodes) {
            throw new Error("no change available");
        }

        atm.setTwoThousandNotes(notesCountAfterWithdrawal);
        this.notesCount = notesCountAfterWithdrawal;

        return true;
    }
}