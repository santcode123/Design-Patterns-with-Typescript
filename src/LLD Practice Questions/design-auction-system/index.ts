import { Colleague } from "./models/Colleagues";
import { AuctionMediator } from "./models/Mediator";



function demo() {
    const auctionMediator = new AuctionMediator();
    const colleage1 = new Colleague('A', auctionMediator);
    const colleage2 = new Colleague('B', auctionMediator);

    colleage1.placeBid(100);
    colleage2.placeBid(300);
    colleage1.placeBid(400);
}