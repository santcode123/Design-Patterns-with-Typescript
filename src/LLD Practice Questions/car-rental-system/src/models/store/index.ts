
import { Location } from "../location";
import { Reservation } from "../reservation";
import { Vehicle } from "../vehicles";


export class Store {
    storeName: string;
    location: Location;
    vehicleInvManager: any;
    contactNumber: number;
    reservationList: Array<Reservation>;

    constructor({ storeName, location, vehicleInvManager, contactNumber, reservationList }:
        { storeName: string; location: Location; vehicleInvManager: any; contactNumber: number; reservationList: Array<Reservation> }) {
        this.storeName = storeName;
        this.location = location;
        this.vehicleInvManager = vehicleInvManager;
        this.contactNumber = contactNumber;
        this.reservationList = reservationList;
    }

    public addVehicle(vehicle: Vehicle) {
        this.vehicleInvManager.addVehicle(vehicle)
    }

    // many more methods
}