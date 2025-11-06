

/**
 * this is parking spot there we gonna park the vehicle
 */



import { SpotStatus, SpotType } from '../../enums';
import { Vehicle } from '../vehicles/Vehicle';

class ParkingSpot {
    private parkingNumber: number;
    private status: SpotStatus;
    private vehicle: Vehicle | null;
    private spotType: SpotType;
    private floorNumber: number;

    constructor({ parkingNumber, spotType }: { parkingNumber: number; spotType: SpotType }) {
        this.parkingNumber = parkingNumber;
        this.status = SpotStatus.AVAILABLE;
        this.vehicle = null;
        this.spotType = spotType;
        this.floorNumber = 0; // as of now we are supporting ground floor parking only
    }

    public getFloolerNumber() {
        return this.floorNumber;
    }

    public getParkingStatus() {
        return this.status;
    }

    public setParkingStatus(status: SpotStatus) {
        this.status = status
    }

    public getParkingNumber() {
        return this.parkingNumber;
    }

    public setFloorNumber(floorNumber: number) {
        this.floorNumber = floorNumber;
    }

    public getParkedVehicle() {
        return this.vehicle;
    }

    public setParkedVehicle(vehicle: Vehicle | null) {
        this.vehicle = vehicle;
    }


    public parkingSpotType() {
        return this.spotType;
    }

    public isSpotAvailable() {
        return this.status === SpotStatus.AVAILABLE;
    }

    public parkVehicle(vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.status = SpotStatus.OCCUPIED;
    }

    public removeVehicle() {
        this.vehicle = null;
        this.status = SpotStatus.AVAILABLE;
    }
}


export { ParkingSpot }