import { Ticket } from "../../../../../models/ticket";
import { ICostComputation } from "../interface";


export class MinuteBasisStrategy implements ICostComputation {
    private milliSecondsInOneMinute = 60 * 1000;
    private chargePerMinute = 0;

    constructor(chargePerMinute: number) {
        this.chargePerMinute = chargePerMinute;
    }
    public calculateCost(ticket: Ticket): number {
        const currentTime = new Date();

        const entryTime = ticket.getEntryTime();

        const diff = currentTime.getTime() - entryTime.getTime(); // milliseconds difference

        const minuteDiff = (diff) / this.milliSecondsInOneMinute;

        return minuteDiff * this.chargePerMinute;
    }
}   