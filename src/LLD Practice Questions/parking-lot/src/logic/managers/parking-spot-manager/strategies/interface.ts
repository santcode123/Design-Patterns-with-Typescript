

import { ParkingSpot } from "../../../../models/parking-spots/parking-spot";
import { Ticket } from "../../../../models/ticket";


interface IStrategy {
    findSpot(spotsMapList: Record<number, Array<ParkingSpot>>): ParkingSpot
}

interface ICostComputation {
    calculateCost(ticket: Ticket): number;
}


export { IStrategy, ICostComputation }