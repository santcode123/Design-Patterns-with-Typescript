import { SpotType, VehicleType } from "../../enums";
import { FourWheelerParkingManager } from "../../logic/managers/parking-spot-manager/fourWheelerManager";
import { SpotManagerFactory } from "../../logic/managers/parking-spot-manager/spotManagerFactory";
import { TwoWheelerParkingManager } from "../../logic/managers/parking-spot-manager/twoWheelerManager";
import { ParkingSpot } from "../parking-spots/parking-spot";
import { Ticket } from "../ticket";
import { Vehicle } from "../vehicles/Vehicle";
import { DBManager } from "../../databases/dbManager";


export class EntryGate {
    private gateNumber: number; // as of now we are supporing one entry and exit gate for simplicity but design should be scalable
    private twoWheelerManagerObj: TwoWheelerParkingManager;
    private fourWheelerManagerObj: FourWheelerParkingManager; // as of now we are supporting two vehicles only, in future we might add more
    private totalNumberOfSpots: number;
    private dbInstance: DBManager;

    constructor(gateNumber: number = 1) {
        this.gateNumber = gateNumber;
        const managerFactory = new SpotManagerFactory();
        const dbInstance = DBManager.getDbInstance();

        this.dbInstance = dbInstance;

        const dbData = dbInstance.getData();

        const twoWheelersData = dbData.twoWheelersSpots;
        const fourWheelersData = dbData.fourWheelerSpots;

        this.totalNumberOfSpots = twoWheelersData.length + fourWheelersData.length;

        this.twoWheelerManagerObj = managerFactory.getSpotManagerBasedOnVehicleType(twoWheelersData, VehicleType.TWO_WHEELER); // initail no spots has been created
        this.fourWheelerManagerObj = managerFactory.getSpotManagerBasedOnVehicleType(fourWheelersData, VehicleType.FOUR_WHEELER);
    }


    public getParkingMangerBasedOnSpotType(spotType: SpotType) {
        if (spotType === SpotType.FOUR_WHEELER) {
            return this.fourWheelerManagerObj;
        } else if (spotType === SpotType.TWO_WHEELER) {
            return this.twoWheelerManagerObj;
        } else {
            throw new Error(`${spotType} type parking spot is not supported!`);
        }
    }

    public addParkingSpot(spot: ParkingSpot) {
        const parkingManager = this.getParkingMangerBasedOnSpotType(spot.parkingSpotType());
        parkingManager.addParkingSpot(spot);
    }

    public addTwoWheelerSpot() {
        const dbData = this.dbInstance.getData();
        const twoWheelersData = dbData.twoWheelersSpots;
        const fourWheelersData = dbData.fourWheelerSpots;

        this.totalNumberOfSpots = twoWheelersData.length + fourWheelersData.length;

        const parkingNumber = this.totalNumberOfSpots + 1;
        const parkingSpot = new ParkingSpot({ parkingNumber, spotType: SpotType.TWO_WHEELER });

        this.addParkingSpot(parkingSpot);
    }

    public addFourWheelerSpot() {
        const dbData = this.dbInstance.getData();
        const twoWheelersData = dbData.twoWheelersSpots;
        const fourWheelersData = dbData.fourWheelerSpots;

        this.totalNumberOfSpots = twoWheelersData.length + fourWheelersData.length;

        const parkingNumber = this.totalNumberOfSpots + 1;
        const parkingSpot = new ParkingSpot({ parkingNumber, spotType: SpotType.FOUR_WHEELER });

        this.addParkingSpot(parkingSpot);
    }

    public getParkingSpot(parkingNumber: number, type: SpotType) {
        const parkingManager = this.getParkingMangerBasedOnSpotType(type);
        return parkingManager.getParkingSpot(parkingNumber);

    }

    public removeParkingSpot(parkingNumber: number, spotType: SpotType) {
        const parkingManager = this.getParkingMangerBasedOnSpotType(spotType);
        parkingManager.removeParkingSpot(parkingNumber);
    }

    public getSpotTypeFromVehicleType(vehicleType: VehicleType) {

        switch (vehicleType) {
            case VehicleType.FOUR_WHEELER: {
                return SpotType.FOUR_WHEELER;
            }
            case VehicleType.TWO_WHEELER: {
                return SpotType.TWO_WHEELER;
            }
            default: {
                throw new Error(`We do not have spot mapping for given vehicle type:${vehicleType}`);
            }
        }
    }

    public bookSpotForVehicle(vehicle: Vehicle) {
        // find free space first

        const vehicleType = vehicle.getVehicleType(); // in our case vehicle type and spot type is same

        const spotType = this.getSpotTypeFromVehicleType(vehicleType);

        const parkingManager = this.getParkingMangerBasedOnSpotType(spotType);

        const bookedSpot = parkingManager.parkVehicle(vehicle);

        if (bookedSpot.parkingSpotType() === SpotType.TWO_WHEELER) {
            this.dbInstance.updateSpotData(bookedSpot, "twoWheelersSpots");
        }

        if (bookedSpot.parkingSpotType() === SpotType.FOUR_WHEELER) {
            this.dbInstance.updateSpotData(bookedSpot, "fourWheelerSpots");
        }

        // console.log({ bookedSpot });

        return bookedSpot;

    }

    public generateTicket(vehicle: Vehicle, bookedSpot: ParkingSpot) {
        // const bookedSpot = this.bookSpotForVehicle(vehicle);

        if (!bookedSpot || bookedSpot.getParkedVehicle() !== vehicle) {
            throw new Error(`We are facing some problem to parking vehicle number ${vehicle.getVehicleNumber()}`);
        }

        // if we have booked the spot now it's time to generate the ticket
        const ticketObj = new Ticket({ vehicle: vehicle, parkingSpot: bookedSpot });

        return ticketObj;

    }

    public showParkingSpots() {
        const parkingSpots = this.dbInstance?.getData();

        console.log("two wheelers list below=>")
        parkingSpots.twoWheelersSpots.forEach(data => console.log(JSON.stringify(data)));

        console.log("four wheelers list below=>")
        parkingSpots.fourWheelerSpots.forEach(data => console.log(JSON.stringify(data)));

    }

    public removeAllParkingSpots() {
        this.dbInstance.cleanDB();
    }
}