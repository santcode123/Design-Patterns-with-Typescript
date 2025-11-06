
import { ParkingSpot } from "./parking-spot";
import { SpotType } from "../../enums";


class CarParkingSpot extends ParkingSpot {
    constructor({ parkingNumber }: { parkingNumber: number }) {
        super({ parkingNumber, spotType: SpotType.FOUR_WHEELER })
    }
}

export { CarParkingSpot };