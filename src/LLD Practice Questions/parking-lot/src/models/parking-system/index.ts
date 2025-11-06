import { SpotType, VehicleType } from "../../enums";
import { EntryGate } from "../entryGate";
import { ExitGate } from "../exitgate/Exitgate";
import { DrivingLicense } from "../License";
// import { ParkingSpot } from "../parking-spots/parking-spot.js";
import { Ticket } from "../ticket/index.js";
import { Vehicle } from "../vehicles/Vehicle";

export class ParkingSystem {
    private entryGate: EntryGate;
    private exitGate: ExitGate;


    constructor() {
        this.entryGate = new EntryGate();
        this.exitGate = new ExitGate();
    }

    public parkVehicle({ vehicleNumber, license, driverName, vehicleType }:
        { vehicleNumber: number; license: DrivingLicense; driverName: string; vehicleType: VehicleType }) {

        // create vehcile object

        const vehicle = new Vehicle({ vehicleNumber, vehicleType, ownerName: driverName, license });



        // park the vehicle
        const bookedSpot = this.entryGate.bookSpotForVehicle(vehicle);

        console.log({ bookedSpot });

        // generate the ticket

        if (!bookedSpot) {
            console.log('parking is full or something went wrong while booking');
        }

        const ticket = this.entryGate.generateTicket(vehicle, bookedSpot);

        return ticket;
    }

    public checkout(ticket: Ticket) {
        this.exitGate.checkOut(ticket);
    }

    public addParkingSpot(spotType: SpotType) {

        if (spotType === SpotType.TWO_WHEELER) {
            this.entryGate.addTwoWheelerSpot();
        } else if (spotType === SpotType.FOUR_WHEELER) {
            this.entryGate.addFourWheelerSpot();
        } else {
            console.log(`given spottype is not yet supported ${spotType}`);
        }

    }

    public removeParkingSpot(parkingNumber: number, spotType: SpotType) {

        this.entryGate.removeParkingSpot(parkingNumber, spotType);
    }

    public showParkingSpots() {
        this.entryGate.showParkingSpots();
    }

    public removeAllSpots() {
        this.entryGate.removeAllParkingSpots();
    }

}