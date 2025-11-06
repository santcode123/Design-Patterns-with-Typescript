
// interfaces

export interface Element {
    price: number;
    roomNumber: number;
    accept(visitor: Visitor): void;
}

export interface Visitor {
    visitSingleRoom(ele: Element): void;
    visitDoubleRoom(ele: Element): void;
    visitDeluxRoom(ele: Element): void;
}