import { VehicleType } from "../../enums";
import { DrivingLicense } from "../License";
import { Vehicle } from "./Vehicle";


export class FourWheelerVehicle extends Vehicle {
    constructor({
        vehicleNumber,
        ownerName,
        license,
    }: {
        vehicleNumber: number;
        ownerName: string;
        license: DrivingLicense;
    }) {
        super({ vehicleNumber, ownerName, license, vehicleType: VehicleType.FOUR_WHEELER });
    }
}