
import { VehicleStatus, VehicleType } from "../../enums/index";

export class Vehicle {
    vehicleNumber: number;
    vehicleType: VehicleType;
    manufactoringName: string;
    kmDriven: Number;
    vehicleStatus: VehicleStatus;
    numberOfSeats: number;
    ccPower: number;

    constructor({
        vehicleNumber,
        vehicleType,
        manufactoringName,
        kmDriven,
        vehicleStatus,
        numberOfSeats,
        ccPower,
    }: {
        vehicleNumber: number;
        vehicleType: VehicleType;
        manufactoringName: string;
        kmDriven: number;
        vehicleStatus: VehicleStatus;
        numberOfSeats: number;
        ccPower: number;
    }) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.manufactoringName = manufactoringName;
        this.kmDriven = kmDriven;
        this.vehicleStatus = vehicleStatus;
        this.numberOfSeats = numberOfSeats;
        this.ccPower = ccPower;
    }


    updateVehicleStatus(vehicleStatus: VehicleStatus) {
        this.vehicleStatus = vehicleStatus;
    }

}


/**
 * we can extend this class in car, bike , truck etc
 */