import { ParkingSpot } from "../../../models/parking-spots/parking-spot";
import { ParkingSpotManager } from "./parking-spot-manager";
import { NearToGateStrategy } from "./strategies/nearTogateStrategy";

export class FourWheelerParkingManager extends ParkingSpotManager {
    constructor(listOfSpots: Array<ParkingSpot>) {
        const parkingStrategy = new NearToGateStrategy();
        super(listOfSpots, parkingStrategy);
    }
}