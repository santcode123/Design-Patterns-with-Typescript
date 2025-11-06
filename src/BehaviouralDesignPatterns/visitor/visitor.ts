import { Element, Visitor } from "./interface";



export class PriceVisitor implements Visitor {
    visitSingleRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        const price = ele.price;
        console.log(`price of room number ${roomNumber}: ${price}`);
    }

    visitDoubleRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        const price = ele.price;
        console.log(`price of room number ${roomNumber}: ${price}`);
    }

    visitDeluxRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        const price = ele.price;
        console.log(`price of room number ${roomNumber}: ${price}`);
    }
}


export class CleanerVisitor implements Visitor {
    visitSingleRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        console.log(`cleaning the room number ${roomNumber}`);
    }

    visitDoubleRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        console.log(`cleaning the room number ${roomNumber}`);
    }

    visitDeluxRoom(ele: Element): void {
        const roomNumber = ele.roomNumber;
        console.log(`cleaning the room number ${roomNumber}`);
    }
}