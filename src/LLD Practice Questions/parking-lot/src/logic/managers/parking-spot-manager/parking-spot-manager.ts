import { SpotType } from "../../../enums";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot";
import { IStrategy } from "./strategies/interface";
import { Vehicle } from "../../../models/vehicles/Vehicle";
import { DBManager } from "../../../databases/dbManager";

type ParkingSpotListFloorWise = Record<number, Array<ParkingSpot>>



export class ParkingSpotManager {
    private spotsMapList: ParkingSpotListFloorWise;
    private strategy: IStrategy;
    private dbInstance: DBManager;


    constructor(listOfSpots: Array<ParkingSpot>, selectedStrategy: IStrategy) {
        this.spotsMapList = { [0]: listOfSpots }; // currently we are suppoting no floor
        this.strategy = selectedStrategy;
        this.dbInstance = DBManager.getDbInstance();
    }

    /**
     * name
     */
    public changeTheStrategy(strategy: IStrategy) {
        this.strategy = strategy;
    }

    public findParkingSpot() {
        return this.strategy.findSpot(this.spotsMapList)
    }

    public addParkingSpot(newSpot: ParkingSpot) {
        // check if same parking number exists or not
        const existSpot = this.spotsMapList[0].find(data => data.getParkingNumber() === newSpot.getParkingNumber());

        if (existSpot) {
            throw new Error('Same Parking number alread exists, please give another parking number');
        }

        this.spotsMapList[0].push(newSpot);

        if (newSpot.parkingSpotType() === SpotType.FOUR_WHEELER) {
            this.dbInstance.addData(newSpot, "fourWheelerSpots");
        } else if (newSpot.parkingSpotType() === SpotType.TWO_WHEELER) {
            this.dbInstance.addData(newSpot, "twoWheelersSpots");
        } else {
            throw new Error("Unable to add new parking spot");
        }

    }

    public getParkingSpot(parkingNumber: number) {
        // we need to check to all floor, but as of now we have one floor , 0th ground floor

        const spotList = this.spotsMapList[0] ?? [];

        const spotObj = spotList.find((data) => data.getParkingNumber() === parkingNumber);

        return spotObj ?? null;
    }

    public removeParkingSpot(parkingNumber: number) {
        const updatedSposts = this.spotsMapList[0].filter(data => data.getParkingNumber() !== parkingNumber);

        this.spotsMapList[0] = updatedSposts;

    }

    public parkVehicle(vehicle: Vehicle) {
        const freeSpot = this.findParkingSpot();

        freeSpot.parkVehicle(vehicle);

        return freeSpot;
    }

    public removeVehicle(vehicle: Vehicle) {
        // find the spot with given vehicle info
        const vehicleSpot = this.spotsMapList[0].find(data => {
            const parkedVehicle = data.getParkedVehicle();

            return parkedVehicle?.getVehicleNumber() === vehicle.getVehicleNumber();
        });

        // remove from the db
        // this.dbInstance.addData
        vehicleSpot?.removeVehicle();
    }
}