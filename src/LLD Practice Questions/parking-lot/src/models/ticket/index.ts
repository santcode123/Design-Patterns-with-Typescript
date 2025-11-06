import { ParkingSpot } from "../parking-spots/parking-spot";
import { Vehicle } from "../vehicles/Vehicle";


export class Ticket {
    private ticketNumber: number;
    private entryTime: Date;
    private vehicle: Vehicle;
    private parkingSpot: ParkingSpot;

    constructor({ vehicle, parkingSpot }: { vehicle: Vehicle; parkingSpot: ParkingSpot }) {
        this.ticketNumber = Math.floor(Math.random() * 100000) + 1;
        this.entryTime = new Date(); // current time will be entry time
        this.vehicle = vehicle;
        this.parkingSpot = parkingSpot;
    }

    public getTicketNumber() {
        return this.ticketNumber;
    }

    public getVehicle() {
        return this.vehicle;
    }
    public getParkingSpot() {
        return this.parkingSpot;
    }

    public getEntryTime() {
        return this.entryTime;
    }
}