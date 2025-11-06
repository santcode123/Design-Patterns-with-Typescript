
import { ParkingSpot } from "../../../../models/parking-spots/parking-spot";
import { IStrategy } from "./interface";


class NearLiftStrategy implements IStrategy {
    findSpot(spotsMapList: Record<number, Array<ParkingSpot>>): ParkingSpot {
        const freeSpot = spotsMapList[0].find(data => data.isSpotAvailable());

        if (!freeSpot) {
            throw new Error('Spot is not available, whole parking is full please do not request again');
        }

        return freeSpot;
    }
}

export { NearLiftStrategy };
