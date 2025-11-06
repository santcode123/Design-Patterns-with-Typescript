
import { User } from "../user";
import { Vehicle } from "../vehicles";
import { ReservationStatus } from '../../enums'

export class Reservation {
    public reservationNumber: number;
    public user: User;
    public vehicle: Vehicle;
    public from: Date;
    public to: Date;
    public reservationStatus: ReservationStatus;


    constructor({ user, reservationNumber, vehicle, from, to, reservationStatus }:
        { user: User, reservationNumber: number, vehicle: Vehicle, from: Date, to: Date, reservationStatus: ReservationStatus }) {
        this.user = user;
        this.reservationNumber = reservationNumber;
        this.vehicle = vehicle;
        this.from = from;
        this.to = to;
        this.reservationStatus = reservationStatus;
    }

    updateReservationStatus(status: ReservationStatus) {
        this.reservationStatus = status;
    }
}