import { Mediator } from "../interfaces";


export class Colleague {
    private mediator: Mediator;
    private name: string;

    constructor(name: string, mediator: Mediator) {
        this.name = name;
        this.mediator = mediator;
        mediator.addBidder(this);
    }

    public placeBid(amount: number) {
        this.mediator.placeBid(this, amount);
    }

    public getAmountNotification(amount: number) {
        console.log('Current bid is ', amount);
        // do some other logic as per business requirements
    }

    public getName() {
        return this.name;
    }
}   