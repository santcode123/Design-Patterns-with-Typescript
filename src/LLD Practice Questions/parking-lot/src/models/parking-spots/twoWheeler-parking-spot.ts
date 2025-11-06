import { ParkingSpot } from "./parking-spot";
import { SpotType } from "../../enums";


class TwoWheelerParkingSpot extends ParkingSpot {
    constructor({ parkingNumber }: { parkingNumber: number }) {
        super({ parkingNumber, spotType: SpotType.TWO_WHEELER });
    }
}

export { TwoWheelerParkingSpot };