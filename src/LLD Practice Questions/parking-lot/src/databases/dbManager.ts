import * as fs from 'fs';
import * as path from 'path';
import { ParkingSpot } from '../models/parking-spots/parking-spot';
import { SpotStatus, SpotType } from '../enums';
import { Vehicle } from '../models/vehicles/Vehicle';

interface DBSchema {
    parkingNumber: number,
    status: SpotStatus,
    vehicle: Vehicle | null,
    spotType: SpotType,
    floorNumber: number
}

export class DBManager {
    private static instance: DBManager;
    private dbObj: {
        twoWheelersSpots: Array<DBSchema>
        fourWheelerSpots: Array<DBSchema>
    };

    private constructor() {
        const dbPath = path.join(__dirname, 'db.json');
        const jsonData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        this.dbObj = jsonData;
    }

    public static getDbInstance(): DBManager {
        if (!DBManager.instance) {
            DBManager.instance = new DBManager();
        }
        return DBManager.instance;
    }

    public getData() {
        const response: {
            twoWheelersSpots: Array<ParkingSpot>,
            fourWheelerSpots: Array<ParkingSpot>
        } = {
            twoWheelersSpots: [],
            fourWheelerSpots: []
        }

        const mappingCallback = (data: DBSchema) => {
            const spotObj = new ParkingSpot({ parkingNumber: data.parkingNumber, spotType: data.spotType });
            spotObj.setParkingStatus(data.status);
            spotObj.setFloorNumber(data.floorNumber);

            if (data.vehicle) {
                // const vehicle = new Vehicle({vehicleNumber: data.ve})
            } else {
                spotObj.setParkedVehicle(null);
            }

            return spotObj;
        }
        response.twoWheelersSpots = this.dbObj.twoWheelersSpots.map(mappingCallback);

        response.fourWheelerSpots = this.dbObj.fourWheelerSpots.map(mappingCallback);

        return response;
    }

    public addData(newSpotObj: ParkingSpot, key: 'twoWheelersSpots' | 'fourWheelerSpots') {
        const dbObj = this.dbObj;
        const dbFomattedData: DBSchema = {
            parkingNumber: newSpotObj.getParkingNumber(), status: newSpotObj.getParkingStatus(),
            vehicle: newSpotObj.getParkedVehicle(), spotType: newSpotObj.parkingSpotType(), floorNumber: newSpotObj.getFloolerNumber()
        }
        dbObj[key].push(dbFomattedData);
        const newDbObj = { ...dbObj };
        const dbPath = path.join(__dirname, 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(newDbObj, null, 2));
    }

    public cleanDB() {
        const newDbObj = { twoWheelersSpots: [], fourWheelerSpots: [] };
        const dbPath = path.join(__dirname, 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(newDbObj, null, 2));
    }

    public updateSpotData(spotObj: ParkingSpot, key: 'twoWheelersSpots' | 'fourWheelerSpots') {
        const dbObj = this.dbObj;
        const dbFomattedData: DBSchema = {
            parkingNumber: spotObj.getParkingNumber(), status: spotObj.getParkingStatus(),
            vehicle: spotObj.getParkedVehicle(), spotType: spotObj.parkingSpotType(), floorNumber: spotObj.getFloolerNumber()
        }

        const oldDataIndex = dbObj[key].findIndex(data => data.parkingNumber == spotObj.getParkingNumber());

        if (oldDataIndex >= 0) {
            dbObj[key][oldDataIndex] = dbFomattedData;
        }

        const newDbObj = { ...dbObj };
        const dbPath = path.join(__dirname, 'db.json');
        fs.writeFileSync(dbPath, JSON.stringify(newDbObj, null, 2));
    }
}
