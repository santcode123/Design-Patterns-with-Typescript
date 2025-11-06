
import { Element, Visitor } from "./interface";


export class SingleRoom implements Element {
    price: number;
    roomNumber: number;

    constructor(roomNumber: number) {
        this.roomNumber = roomNumber;
        this.price = 200;
    }

    accept(visitor: Visitor): void {
        visitor.visitSingleRoom(this);   // this way we can support different action or functonality on the given room
    }
}

export class DoubleRoom implements Element {
    price: number;
    roomNumber: number;

    constructor(roomNumber: number) {
        this.roomNumber = roomNumber;
        this.price = 400;
    }
    /**
     * 
     * @param visitor other logic of class can go here 
     */
    accept(visitor: Visitor): void {
        visitor.visitDoubleRoom(this);
    }
}


export class DeluxRoom implements Element {
    price: number;
    roomNumber: number;

    constructor(roomNumber: number) {
        this.roomNumber = roomNumber;
        this.price = 1000;
    }

    accept(visitor: Visitor): void {
        visitor.visitDeluxRoom(this);
    }
}

