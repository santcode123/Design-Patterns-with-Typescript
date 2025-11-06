import { ParkingSpot } from "../../../models/parking-spots/parking-spot";
import { ParkingSpotManager } from "./parking-spot-manager";
import { NearLiftStrategy } from "./strategies/nearLiftStrategy";

export class TwoWheelerParkingManager extends ParkingSpotManager {
    constructor(listOfSpots: Array<ParkingSpot>) {
        const parkingStrategy = new NearLiftStrategy();
        super(listOfSpots, parkingStrategy);
    }
}