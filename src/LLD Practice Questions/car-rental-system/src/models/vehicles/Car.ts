import { Vehicle } from "./Vehicle"
import { VehicleStatus, VehicleType } from '../../enums'


export class Car extends Vehicle {
    constructor({
        vehicleNumber,
        manufactoringName,
        kmDriven,
        numberOfSeats,
        ccPower,
    }: {
        vehicleNumber: number;
        manufactoringName: string;
        kmDriven: number;
        numberOfSeats: number;
        ccPower: number;
    }) {
        super({
            vehicleNumber,
            vehicleType: VehicleType.CAR,
            manufactoringName,
            kmDriven,
            vehicleStatus: VehicleStatus.AVAILABLE,
            numberOfSeats,
            ccPower,
        })
    }
}