import { DeluxRoom, DoubleRoom, SingleRoom } from "./element";
import { CleanerVisitor, PriceVisitor } from "./visitor";



function demo() {
    const room1 = new SingleRoom(101);
    const room2 = new DoubleRoom(201);
    const room3 = new DeluxRoom(301);

    // suppose we want to know the price of each room
    const priceVisitor = new PriceVisitor();

    room1.accept(priceVisitor);
    room2.accept(priceVisitor);
    room3.accept(priceVisitor);

    // suppose delux room got empty now we need to clean it

    const cleanVisitor = new CleanerVisitor();

    room3.accept(cleanVisitor);
}

demo();