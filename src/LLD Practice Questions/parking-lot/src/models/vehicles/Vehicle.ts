import { VehicleType } from "../../enums";
import { DrivingLicense } from "../License";

export class Vehicle {
    private vehicleNumber: number;
    private vehicleType: VehicleType;
    private ownerName: string;
    private license: DrivingLicense;

    constructor({
        vehicleNumber,
        vehicleType,
        ownerName,
        license,
    }: {
        vehicleNumber: number;
        vehicleType: VehicleType;
        ownerName: string;
        license: DrivingLicense;
    }) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.ownerName = ownerName;
        this.license = license;
    }

    public getVehicleNumber() {
        return this.vehicleNumber;
    }

    public getVehicleType() {
        return this.vehicleType;
    }

    public getOwnerName() {
        return this.ownerName;
    }

    public getLicense() {
        return this.license;
    }
}
