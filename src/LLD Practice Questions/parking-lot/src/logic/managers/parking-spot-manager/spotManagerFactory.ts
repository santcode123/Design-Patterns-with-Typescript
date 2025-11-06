import { VehicleType } from "../../../enums";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot";
import { FourWheelerParkingManager } from "./fourWheelerManager";
import { TwoWheelerParkingManager } from "./twoWheelerManager";


export class SpotManagerFactory {
    public getSpotManagerBasedOnVehicleType(listOfSpots: Array<ParkingSpot>, vehicleType: VehicleType) {
        switch (vehicleType) {
            case VehicleType.FOUR_WHEELER: {
                return new FourWheelerParkingManager(listOfSpots);
            }

            case VehicleType.TWO_WHEELER: {
                return new TwoWheelerParkingManager(listOfSpots);
            }

            default: {
                throw new Error(`${vehicleType} is not supported as of now in the parking`);
            }
        }
    }
}