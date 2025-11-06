// Here we gonna write some examples to dry run our parking lot lld design and all possible corner cases
import { ParkingSystem } from "../src/models/parking-system";
import { SpotType, VehicleType } from "./enums";
import { DrivingLicense } from "./models/License";


console.log("parking lot demo started... ");

function bootStrap() {
    const parkingSystem = new ParkingSystem();

    parkingSystem.removeAllSpots(); // remove the side effects

    // let's  print all the parking spots available as of now

    parkingSystem.showParkingSpots();

    // now let's add two wheelers and four wheelers spot

    parkingSystem.addParkingSpot(SpotType.TWO_WHEELER);
    parkingSystem.addParkingSpot(SpotType.TWO_WHEELER);

    parkingSystem.addParkingSpot(SpotType.FOUR_WHEELER);
    parkingSystem.addParkingSpot(SpotType.FOUR_WHEELER);

    // now show the parking spots

    parkingSystem.showParkingSpots();

    // now park one bike and one car

    const bikeDriverLicense = new DrivingLicense({ name: 'Santosh', licenseId: '13', address: 'Banglore' });
    const CarDriverLicense = new DrivingLicense({ name: 'Vishnu', licenseId: '156', address: 'Dausa' });

    const bikeTkt = parkingSystem.parkVehicle({ driverName: 'Santosh', license: bikeDriverLicense, vehicleNumber: 3435, vehicleType: VehicleType.TWO_WHEELER });
    const carTkt = parkingSystem.parkVehicle({ driverName: 'Vishnu', license: CarDriverLicense, vehicleNumber: 4322, vehicleType: VehicleType.FOUR_WHEELER });

    // now show the parking spots 
    parkingSystem.showParkingSpots();

    // now print the invoices

    parkingSystem.checkout(bikeTkt);
    parkingSystem.checkout(carTkt);

    // now show the parking spots 
    console.log("after checkout the spots are")
    // parkingSystem.showParkingSpots();

    parkingSystem.removeAllSpots();

}

bootStrap();





