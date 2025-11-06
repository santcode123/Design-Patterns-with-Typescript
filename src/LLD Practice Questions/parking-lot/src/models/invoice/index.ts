import { PaymentStatus } from "../../enums";
import { Ticket } from "../ticket";
import { Vehicle } from "../vehicles/Vehicle";

export class Invoice {
    private invoiceNumber: string; // it should be unique
    private ticket: Ticket;
    private paymentStatus: PaymentStatus;

    constructor({ ticket }: { ticket: Ticket }) {
        this.invoiceNumber = Math.random().toString(36).substring(2);
        this.ticket = ticket;
        this.paymentStatus = PaymentStatus.UNPAID;
    }

    public setPaymentStatus(status: PaymentStatus) {
        this.paymentStatus = status;
    }

    public getPaymentStatus() {
        return this.paymentStatus;
    }

    public getInvoiceNumber() {
        return this.invoiceNumber;
    }

    public getTicket() {
        return this.ticket;
    }

}