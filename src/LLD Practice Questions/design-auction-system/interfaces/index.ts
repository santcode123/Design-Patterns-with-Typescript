import type { Colleague } from "../models/Colleagues";

export interface Mediator {
    addBidder(bidder: Colleague): void;
    placeBid(sender: any, amount: number): void;
    // sendNotifications(amount: number): void;
}