import { Ticket } from "../../../../../models/ticket";
import { ICostComputation } from "../interface";


export class HourlyBasisStrategy implements ICostComputation {
    private milliSecondsInOneHrs = 60 * 60 * 1000;
    private chargePerHour = 0;

    constructor(chargePerHour: number) {
        this.chargePerHour = chargePerHour;
    }
    public calculateCost(ticket: Ticket): number {
        const currentTime = new Date();

        const entryTime = ticket.getEntryTime();

        const diff = currentTime.getTime() - entryTime.getTime(); // milliseconds difference

        const hoursDiff = (diff) / this.milliSecondsInOneHrs;

        return hoursDiff * this.chargePerHour;
    }
}   