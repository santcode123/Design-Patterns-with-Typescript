import { Mediator } from "../interfaces";
import { Colleague } from "./Colleagues";


export class AuctionMediator implements Mediator {
    private listOfColleagues: Array<Colleague>;

    constructor() {
        this.listOfColleagues = [];
    }
    addBidder(bidder: Colleague): void {
        this.listOfColleagues.push(bidder);
    }
    placeBid(sender: Colleague, amount: number): void {
        // send notification to other colleagues
        for (let bidder of this.listOfColleagues) {
            if (bidder !== sender) {
                bidder.getAmountNotification(amount);
            }
        }
    }
}