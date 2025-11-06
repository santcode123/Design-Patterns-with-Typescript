import { PaymentStatus, VehicleType } from "../../enums";
import { FourWheelerParkingManager } from "../../logic/managers/parking-spot-manager/fourWheelerManager";
import { SpotManagerFactory } from "../../logic/managers/parking-spot-manager/spotManagerFactory";
import { HourlyBasisStrategy } from "../../logic/managers/parking-spot-manager/strategies/cost-computation";
import { ICostComputation } from "../../logic/managers/parking-spot-manager/strategies/interface";
import { TwoWheelerParkingManager } from "../../logic/managers/parking-spot-manager/twoWheelerManager";
import { Invoice } from "../invoice";
import { Ticket } from "../ticket";
import { Vehicle } from "../vehicles/Vehicle";
import { DBManager } from "../../databases/dbManager";

export class ExitGate {
    private costStrategy: ICostComputation;
    private perMinuteCharge: number = 1;
    private perHourCharge: number = 30;
    private twoWheelerManager: TwoWheelerParkingManager;
    private fourWheelerManager: FourWheelerParkingManager;

    constructor() {
        this.costStrategy = new HourlyBasisStrategy(this.perHourCharge); // hourly basis is default costCalculation strategy
        const managerFactory = new SpotManagerFactory();
        const dbInstance = DBManager.getDbInstance();

        const dbData = dbInstance.getData();

        const twoWheelerData = dbData.twoWheelersSpots;
        const fourWheelersData = dbData.fourWheelerSpots;

        this.twoWheelerManager = managerFactory.getSpotManagerBasedOnVehicleType(twoWheelerData, VehicleType.TWO_WHEELER); // initail no spots has been created
        this.fourWheelerManager = managerFactory.getSpotManagerBasedOnVehicleType(fourWheelersData, VehicleType.FOUR_WHEELER);
    }

    public setPerMinuteCharge(chargePerMinute: number) {
        this.perMinuteCharge = chargePerMinute
    }

    public setPerHourCharge(chargePerHour: number) {
        this.perHourCharge = chargePerHour;
    }

    public setStrategy(strategy: ICostComputation) {
        this.costStrategy = strategy;
    }

    public costCalculation(ticket: Ticket) {
        return this.costStrategy.calculateCost(ticket);
    }

    public printBillReceipt(invoice: Invoice) {
        const ticket = invoice.getTicket();
        const vehicle = ticket?.getVehicle();
        const cost = this.costCalculation(ticket);
        console.log(`Thanks for parking the vehicle at our park, please find he print info vehicle number: ${vehicle.getVehicleNumber()} and amount: ${cost}`);
    }

    public generateInvoice(ticket: Ticket) {
        return new Invoice({ ticket });
    }

    public removeVehicle(vehicle: Vehicle) {
        const vehicleType = vehicle.getVehicleType();

        if (vehicleType === VehicleType.TWO_WHEELER) {
            this.twoWheelerManager.removeVehicle(vehicle);
        } else if (vehicleType === VehicleType.FOUR_WHEELER) {
            this.fourWheelerManager.removeVehicle(vehicle);
        }
        // the function should return some isSuccess so that based on that we can take next action otherwise we do not
    }

    public doPayment(invoice: Invoice) {
        // some logic or payment service method will be called here
        invoice.setPaymentStatus(PaymentStatus.PAID);

        return invoice;
    }

    public checkOut(ticket: Ticket) {
        const vehicle = ticket.getVehicle();
        // in the process of checkout we need to remove vehicle from the spot
        this.removeVehicle(vehicle);

        // now we need to generate invoice for tha vehicle 
        const invoice = this.generateInvoice(ticket);

        this.printBillReceipt(invoice);
    }

}