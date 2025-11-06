import { Vehicle } from "../vehicles";


export class VehicleInventoryManagment {
    listOfVehicles: Array<Vehicle>

    constructor(listOfVehicles: Array<Vehicle>) {
        this.listOfVehicles = listOfVehicles;
    }

}